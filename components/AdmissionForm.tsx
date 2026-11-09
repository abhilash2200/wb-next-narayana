"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { useAdmissionDropdowns } from "@/hooks/useAdmissionDropdowns";
import {
  sendAdmissionOtp,
  resendAdmissionOtp,
  ResendAdmissionOtpError,
  verifyAdmissionOtp,
  completeAdmissionRequest,
} from "@/app/services/admissionOptionsService";

interface AdmissionFormProps {
  formId: number | string;
  pageId?: number;
  revisionId?: number;
  pageSection?: string;
  variant?: "card" | "footer" | "modal";
  action?: "brochure" | "fees" | "enquiry" | null;
  onSuccess?: () => void;
  initialCity?: string;
  initialBranch?: string;
  initialClass?: string;
  isPreview?: boolean;
}

export default function AdmissionForm({
  formId,
  pageId,
  revisionId,
  pageSection,
  variant = "card",
  action = null,
  onSuccess,
  initialCity,
  initialBranch,
  initialClass,
  isPreview = false,
}: AdmissionFormProps) {
  const router = useRouter();
  const { pageId: contextPageId, revisionId: contextRevisionId, isPreview: contextIsPreview } = useModal();
  const effectiveIsPreview = Boolean(isPreview || contextIsPreview);
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const {
    city,
    branch,
    board,
    reservationType,
    studentClass,
    cityId,
    branchId,
    classId,
    cityList,
    branchList,
    boardList,
    reservationTypeList,
    classList,
    handleCityChange,
    handleBranchChange,
    handleBoardChange,
    handleReservationChange,
    handleClassChange,
  } = useAdmissionDropdowns({
    city: initialCity,
    branch: initialBranch,
    studentClass: initialClass,
  });

  // OTP & Form State
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageType, setOtpMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const dbId = "";


  const [challengeToken, setChallengeToken] = useState("");
  const [resendSeconds, setResendSeconds] = useState(0);
  const [resendingOtp, setResendingOtp] = useState(false);

  const [verificationToken, setVerificationToken] = useState("");

  const OTP_RESEND_COOLDOWN = 50;

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);


  // UTM Parameters
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "" });

  useEffect(() => {
    // Read from window location after hydration
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSendOtp = async () => {
    if (effectiveIsPreview) {
      setOtpMessage("Form submission is disabled in preview mode.");
      setOtpMessageType("error");
      return;
    }

    if (!studentName.trim()) {
      setOtpMessage("Please enter Student Name.");
      setOtpMessageType("error");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      setOtpMessage("Please enter a valid 10-digit mobile number.");
      setOtpMessageType("error");
      return;
    }

    if (!parentEmail.trim()) {
      // Email is optional; don't block submission.
    }

    if (!cityId || !branchId || !classId) {
      setOtpMessage(
        "City, Branch, or Class ID missing. Please reselect your admission options.",
      );
      setOtpMessageType("error");
      return;
    }

    if (!board || !reservationType) {
      setOtpMessage("Please select Board and Reservation Type.");
      setOtpMessageType("error");
      return;
    }

    const finalPageId = pageId || contextPageId || 61;
    const finalRevisionId = revisionId || contextRevisionId || 79;

    if (!finalPageId || !finalRevisionId) {
      setOtpMessage("Page configuration is missing. Please refresh and try again.");
      setOtpMessageType("error");
      return;
    }

    setLoading(true);
    setOtpMessage("");
    setOtpMessageType("");

    try {
      const result = await sendAdmissionOtp({
        page_id: Number(finalPageId),
        revision_id: Number(finalRevisionId),
        name: studentName.trim(),
        phone,
        parent_email: parentEmail.trim(),
        city_id: Number(cityId),
        branch_id: Number(branchId),
        board,
        reservation_type: reservationType,
        class_id: Number(classId),
        utm_source: utmParams.source,
        utm_medium: utmParams.medium,
        utm_campaign: utmParams.campaign,
        redirect_from: "wbnarayanaschools",
        page_section: pageSection || "",
      });

      if (result.success) {
        setChallengeToken(result.data.challenge_token);
        setOtpVisible(true);
        setResendSeconds(OTP_RESEND_COOLDOWN);
        setOtpMessage(result.message || "OTP sent successfully.");
        setOtpMessageType("success");
      } else {
        setOtpMessage(result.message || "Unable to send OTP.");
        setOtpMessageType("error");
      }
    } catch (error) {
      setOtpMessage(
        error instanceof Error ? error.message : "Unable to send OTP. Please try again.",
      );
      setOtpMessageType("error");
    } finally {
      setLoading(false);
    }
  };



  const handleVerifyOtp = async () => {
    if (effectiveIsPreview) {
      setOtpMessage("OTP verification is disabled in preview mode.");
      setOtpMessageType("error");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setOtpMessage("Please enter the 6-digit OTP.");
      setOtpMessageType("error");
      return;
    }

    if (!challengeToken) {
      setOtpMessage("Please request an OTP first.");
      setOtpMessageType("error");
      return;
    }

    setLoading(true);
    setOtpMessage("Verifying OTP...");
    setOtpMessageType("");

    try {
      const result = await verifyAdmissionOtp({
        challenge_token: challengeToken,
        otp,
      });

      const token = result.data.verification_token;

      if (!result.success || !token) {
        throw new Error(result.message || "OTP verification failed.");
      }

      setVerificationToken(token);
      setOtpVerified(true);
      setOtpMessage(result.message || "OTP verified successfully.");
      setOtpMessageType("success");
    } catch (error: unknown) {
      setOtpVerified(false);
      setVerificationToken("");

      setOtpMessage(
        error instanceof Error
          ? error.message
          : "Unable to verify OTP. Please try again.",
      );
      setOtpMessageType("error");
    } finally {
      setLoading(false);
    }
  };



  const handleCompleteAdmission = async () => {
    if (effectiveIsPreview) {
      setOtpMessage("Form submission is disabled in preview mode.");
      setOtpMessageType("error");
      return;
    }

    if (!otpVerified || !verificationToken) {
      setOtpMessage("Please verify your OTP first.");
      setOtpMessageType("error");
      return;
    }

    setLoading(true);
    setOtpMessage("");
    setOtpMessageType("");

    try {
      const intent =
        action === "brochure"
          ? "BROCHURE"
          : action === "fees"
            ? "FEES"
            : "ENQUIRY";

      const result = await completeAdmissionRequest({
        verification_token: verificationToken,
        intent,
      });

      if (!result.success) {
        throw new Error(
          result.message || "Unable to complete admission request.",
        );
      }

      const nextAction = result.data.next_action;
      const downloadUrl = nextAction?.download_url;
      if (intent === "BROCHURE" && !downloadUrl) {
        console.error("Brochure download URL missing:", result.data);
        throw new Error(
          "Brochure download URL was not returned by the server.",
        );
      }
      const redirectUrl = nextAction?.redirect_url;

      // Preserve the action and API response for the Thank You page.
      sessionStorage.setItem(
        "admissionThankYou",
        JSON.stringify({
          intent,
          downloadUrl: downloadUrl || "",
          downloadFilename: nextAction?.download_filename || "brochure.pdf",
          redirectUrl: redirectUrl || "",
          sourceUrl: window.location.href,
        }),
      );

      // Navigate to Thank You; its page will handle the next action.
      onSuccess?.();
      router.push("/thank-you");
    } catch (error: unknown) {
      setOtpMessage(
        error instanceof Error
          ? error.message
          : "Unable to complete your request. Please try again.",
      );
      setOtpMessageType("error");
    } finally {
      setLoading(false);
    }
  };




  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (effectiveIsPreview) {
      setOtpMessage("Form submission is disabled in preview mode.");
      setOtpMessageType("error");
      return;
    }

    if (!otpVerified || !verificationToken) {
      setOtpMessage("Please verify your OTP first.");
      setOtpMessageType("error");
      return;
    }

    void handleCompleteAdmission();
  };



  const handleResendOtp = async () => {
    if (effectiveIsPreview || !challengeToken || resendSeconds > 0 || resendingOtp) {
      return;
    }

    setResendingOtp(true);
    setOtpMessage("");
    setOtpMessageType("");

    try {
      const result = await resendAdmissionOtp(challengeToken);

      if (result.success) {
        // Keep the existing challenge token.
        setResendSeconds(OTP_RESEND_COOLDOWN);
        setOtp("");
        setOtpMessage(result.message || "OTP resent successfully.");
        setOtpMessageType("success");
      }
    } catch (error) {
      if (error instanceof ResendAdmissionOtpError) {
        if (
          error.status === 429 &&
          error.retryAfterSeconds !== undefined
        ) {
          setResendSeconds(error.retryAfterSeconds);
        }

        setOtpMessage(error.message);
      } else {
        setOtpMessage(
          error instanceof Error
            ? error.message
            : "Unable to resend OTP. Please try again.",
        );
      }

      setOtpMessageType("error");
    } finally {
      setResendingOtp(false);
    }
  };


  const inputClass =
    variant === "modal"
      ? "w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-brandBlue focus:outline-none"
      : "w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-md text-gray-700 focus:border-brandBlue focus:outline-none";

  const selectClass =
    variant === "modal"
      ? "w-full appearance-none rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-brandBlue focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
      : "w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2.5 text-md text-gray-700 focus:border-brandBlue focus:outline-none disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <form
      id={`frm_admission_open_${formId}`}
      name={`frm_admission_open_${formId}`}
      className="space-y-3"
      action="/leads.php"
      method="POST"
      onSubmit={handleSubmit}
    >
      {/* Student Name */}
      <input
        type="text"
        name="name"
        id={`name_${formId}`}
        placeholder="Student Name"
        required
        pattern="[A-Za-z\s]+"
        value={studentName}
        disabled={otpVisible}
        onChange={(e) =>
          setStudentName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
        }
        className={inputClass}
      />

      {/* Phone Number */}
      <input
        type="tel"
        name="phone"
        id={`phone_${formId}`}
        placeholder="Ph. Number"
        required
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        value={phone}
        disabled={otpVisible}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className={inputClass}
      />

      {/* Parent Email */}
      <input
        type="email"
        name="parent_email"
        id={`parent_email_${formId}`}
        placeholder="Parent's Email (Optional)"
        value={parentEmail}
        disabled={otpVisible}
        onChange={(e) => setParentEmail(e.target.value)}
        className={inputClass}
      />

      {/* City */}
      <div className="relative">
        <select
          name="city"
          id={`city_${formId}`}
          required
          value={city}
          disabled={otpVisible}
          onChange={(e) => handleCityChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Select City
          </option>
          {cityList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {variant === "modal" && (
          <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-4 text-xs text-gray-400" />
        )}
      </div>

      {/* Branch */}
      <div className="relative">
        <select
          name="branch"
          id={`branch_${formId}`}
          required
          value={branch}
          disabled={!city || otpVisible}
          onChange={(e) => handleBranchChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Select Branch
          </option>
          {branchList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {variant === "modal" && (
          <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-4 text-xs text-gray-400" />
        )}
      </div>

      {/* Board */}
      <div className="relative">
        <select
          name="board"
          id={`board_${formId}`}
          required
          value={board}
          disabled={!branch || otpVisible}
          onChange={(e) => handleBoardChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Select Board
          </option>

          {boardList.map((item) => (
            <option key={`${item.code}-${item.name}`} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>

        {variant === "modal" && (
          <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-4 text-xs text-gray-400" />
        )}
      </div>


      <div className="relative">
        <select
          name="reservation_type"
          id={`reservation_${formId}`}
          required
          value={reservationType}
          disabled={!board || reservationTypeList.length === 0 || otpVisible}
          onChange={(e) => handleReservationChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Select Reservation Type
          </option>

          {reservationTypeList.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>

        {variant === "modal" && (
          <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-4 text-xs text-gray-400" />
        )}
      </div>


      {/* Class */}
      <div className="relative">
        <select
          name="class"
          id={`class_${formId}`}
          required
          value={studentClass}
          disabled={!reservationType || otpVisible}
          onChange={(e) => handleClassChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Select Class
          </option>
          {classList.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        {variant === "modal" && (
          <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-4 text-xs text-gray-400" />
        )}
      </div>

      {/* Hidden Fields for Backend */}
      <input type="hidden" name="utm_source" id={`utm_source_${formId}`} value={utmParams.source} />
      <input type="hidden" name="utm_medium" id={`utm_medium_${formId}`} value={utmParams.medium} />
      <input type="hidden" name="utm_campaign" id={`utm_campaign_${formId}`} value={utmParams.campaign} />
      <input type="hidden" name="hidden_branch" id={`hidden_branch_${formId}`} value={branch} />
      <input type="hidden" name="redirect_from" id={`redirect_from_${formId}`} value="wbnarayanaschools" />
      <input type="hidden" name="DBid" id={`DBid_${formId}`} value={dbId} />
      <input type="hidden" name="otp_verified" id={`otp_verified_${formId}`} value={otpVerified ? "1" : "0"} />
      <input type="hidden" name="downloadBrochure" id={`downloadBrochure_${formId}`} value={action === "brochure" ? "YES" : "NO"} />
      <input type="hidden" name="feesStucture" id={`feesStucture_${formId}`} value={action === "fees" ? "YES" : "NO"} />

      {/* OTP Message Display */}
      {otpMessage && (
        <div
          id={`otp_message_${formId}`}
          className={`my-2 text-sm font-medium rounded-lg px-3 py-1.5 ${otpMessageType === "success"
              ? "text-green-700 bg-green-50"
              : otpMessageType === "error"
                ? "text-red-700 bg-red-50"
                : "text-gray-700"
            }`}
        >
          {otpMessage}
        </div>
      )}

      {/* Step 1: Send OTP / Submit Button */}
      {!otpVisible && (
        <div className="mt-2 flex flex-col gap-2" id={`getOtpSection_${formId}`}>
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || effectiveIsPreview}
            title={effectiveIsPreview ? "Form submission is disabled in preview mode" : undefined}
            className={`w-full bg-brandOrange hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded text-sm transition inline-flex items-center justify-center gap-2 ${variant === "modal" ? "py-3" : ""
              }`}
          >
            {loading ? (
              <>
                <span>Sending OTP...</span>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </>
            ) : effectiveIsPreview ? (
              <span>Submission Disabled (Preview Mode)</span>
            ) : (
              <span>Submit Now</span>
            )}
          </button>
          {effectiveIsPreview && (
            <p className="text-center text-[11px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/70 rounded py-1 px-2">
              Preview Mode: Form submissions are disabled
            </p>
          )}
        </div>
      )}


      {/* Resend OTP: Show only after OTP has been sent */}
      {otpVisible && !otpVerified && challengeToken && (
        <div className="text-center text-sm">
          {resendSeconds > 0 ? (
            <p className="text-gray-500">
              Resend OTP in {resendSeconds}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendingOtp || effectiveIsPreview}
              title={effectiveIsPreview ? "OTP resend is disabled in preview mode" : undefined}
              className="font-medium text-brandBlue hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resendingOtp ? "Resending OTP..." : "Resend OTP"}
            </button>
          )}
        </div>
      )}



      {/* Step 2: Enter & Verify OTP */}
      {otpVisible && !otpVerified && (
        <div className="mb-2 space-y-2" id={`otpSection_${formId}`}>
          <input
            type="text"
            className={inputClass}
            placeholder="Enter 6-digit OTP"
            id={`otp_input_${formId}`}
            name="otp_input"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />

          <button
            type="button"
            className="w-full bg-brandBlue hover:bg-brandBlueDark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2.5 rounded transition"
            id={`verifyOtpBtn_${formId}`}
            onClick={handleVerifyOtp}
            disabled={loading || effectiveIsPreview}
            title={effectiveIsPreview ? "OTP verification is disabled in preview mode" : undefined}
          >
            {effectiveIsPreview ? "Verify Disabled (Preview Mode)" : "Verify OTP"}
          </button>
        </div>
      )}

      {/* Step 3: Verified -> Confirm & Submit */}
      {otpVerified && (
        <button
          type="submit"
          className="w-full bg-brandOrange hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded text-sm transition inline-flex items-center justify-center gap-2"
          id={`about-get-btn-${formId}`}
          disabled={loading || effectiveIsPreview}
          title={effectiveIsPreview ? "Form submission is disabled in preview mode" : undefined}
        >
          {effectiveIsPreview ? "Submission Disabled (Preview Mode)" : "Confirm OTP & Submit"}
        </button>
      )}
    </form>
  );
}
