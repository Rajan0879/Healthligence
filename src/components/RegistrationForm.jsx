import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Camera,
  Trash2,
  Upload,
  FileText,
  ChevronDown,
  SlidersHorizontal,
  CheckSquare,
} from "lucide-react";
import {
  InputField,
  SelectField,
  ToggleSwitch,
  FloatingLabelInput,
} from "./FormField";
import {
  validateName,
  validateMobile,
  validateAge,
  validateDOB,
  validateEmail,
  validatePincode,
  validateKinNumber,
  blockNonDigits,
  blockNonAlphabets
} from "../utils/validation";
import { calculateDOBFromAge, calculateAgeFromDOB } from "../utils/dateUtils";

const DOCUMENT_TYPES = [
  "Aadhar Card",
  "PAN Card",
  "Driving Licence",
  "Passport",
];
const COMMUNICATION_LANGUAGES = ["Odia", "English", "Hindi"];




const RegistrationForm = ({ onSubmit }) => {
  const [activeSubTab, setActiveSubTab] = useState("Regular");


  const [formData, setFormData] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    gender: "",
    ageYY: "",
    ageMM: "",
    ageDD: "",
    dobYY: "",
    dobMM: "",
    dobDD: "",
    address1: "",
    address2: "",
    pin: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "IN",
    primaryRegNo: "",
    nextKinContact: "",
    email: "",
    attendantName: "",
    attendantRel: "",
    docType: "",
    consentResearch: true,
    commLanguage: "Odia",
    kycVerified: false,
    docNumber: "",
  });


  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});


  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const profileInputRef = useRef(null);



  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };


    if (['ageYY', 'ageMM', 'ageDD'].includes(name)) {
      const { dobYY, dobMM, dobDD } = calculateDOBFromAge(
        name === 'ageYY' ? value : formData.ageYY,
        name === 'ageMM' ? value : formData.ageMM,
        name === 'ageDD' ? value : formData.ageDD
      );
      newFormData = { ...newFormData, dobYY, dobMM, dobDD };
    }


    if (['dobYY', 'dobMM', 'dobDD'].includes(name)) {
      const { ageYY, ageMM, ageDD } = calculateAgeFromDOB(
        name === 'dobYY' ? value : formData.dobYY,
        name === 'dobMM' ? value : formData.dobMM,
        name === 'dobDD' ? value : formData.dobDD
      );
      newFormData = { ...newFormData, ageYY, ageMM, ageDD };
    }

    setFormData(newFormData);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };




  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const validFiles = uploadedFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "application/pdf"
    );

    if (validFiles.length !== uploadedFiles.length) {
      alert("Only JPG and PDF files are allowed.");
    }

    const items = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...items]);

    if (e.target) e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const item = prev[index];
      if (item && item.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((_, i) => i !== index);
    });
  };


  const handleProfileUpload = (e) => {
    const file = (e.target.files && e.target.files[0]) || null;
    if (!file) return;
    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
      )
    ) {
      alert("Please select a JPG or PNG image.");
      e.target.value = "";
      return;
    }
    setProfilePhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    e.target.value = "";
  };


  useEffect(() => {
    return () => {
      files.forEach(
        (item) => item.preview && URL.revokeObjectURL(item.preview)
      );
      if (profilePhotoUrl) URL.revokeObjectURL(profilePhotoUrl);
    };
  }, [files, profilePhotoUrl]);


  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case "mobile":
        error = validateMobile(value);
        break;
      case "firstName":
      case "lastName":
        error = validateName(value);
        break;
      case "pin":
        error = validatePincode(value);
        break;
      case "nextKinContact":
        error = validateKinNumber(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "ageYY":
        error = validateAge(value);
        break;
      case "dobYY":
      case "dobMM":
      case "dobDD":
        error = validateDOB(
          name === 'dobYY' ? value : formData.dobYY,
          name === 'dobMM' ? value : formData.dobMM,
          name === 'dobDD' ? value : formData.dobDD
        );
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const isFormValid = useMemo(() => {
    const requiredFields = [
      "mobile",
      "firstName",
      "lastName",
      "gender",
      "ageYY",
      "dobYY",
      "address1",
      "address2",
      "pin",
      "nextKinContact",
    ];


    const allFilled = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );


    const noErrors = Object.values(errors).every((err) => err === null);


    const hasFile = files.length > 0;

    return allFilled && noErrors && hasFile;
  }, [formData, errors, files]);

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formData);
    } else {
      const newTouched = {};
      const fields = [
        "mobile",
        "firstName",
        "lastName",
        "gender",
        "ageYY",
        "dobYY",
        "address1",
        "address2",
        "pin",
        "nextKinContact",
      ];
      fields.forEach((f) => (newTouched[f] = true));
      setTouched((prev) => ({ ...prev, ...newTouched }));
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-700 pb-40 md:pb-24">

      <div className="p-4 sm:p-6 md:px-8  mx-auto space-y-8">

        <div className="bg-gray-100 p-1 rounded-md inline-flex space-x-1">
          {["Regular", "Quick", "Import from ABHA", "Scan Documents"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeSubTab === tab
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            )
          )}
        </div>


        <section>
          <h3 className="text-xs font-bold text-gray-800  mb-4 tracking-wide">
            Identification Details
          </h3>
          <div className="flex flex-col xl:flex-row gap-6 items-center md:items-start xl:items-end">

            <div className="flex-shrink-0 relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    profilePhotoUrl || "https://i.postimg.cc/Bn4F6HgN/mine.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  profileInputRef.current && profileInputRef.current.click()
                }
                className="absolute -bottom-4 right-[28px] z-10 p-1.5 bg-white rounded-full shadow cursor-pointer border hover:bg-gray-50 "
                aria-label="Upload profile photo"
              >
                <Camera size={16} className="text-gray-600 " />
              </button>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </div>


            <div className="w-full xl:flex-1 max-w-[741px] flex flex-col gap-4 ">
              <InputField
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && errors.mobile}
                placeholder="Enter Mobile Number *"
                required
                maxLength={10}
                inputMode="numeric"
                onKeyDown={blockNonDigits}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                  onKeyDown={blockNonAlphabets}
                />
                <InputField
                  name="lastName"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                  onKeyDown={blockNonAlphabets}
                />
              </div>
            </div>

            <div className="w-full xl:w-[630px] flex flex-col md:flex-row gap-6 items-start md:items-end">

              <div className="w-full md:w-48 flex flex-col">
                <label className="mb-3 text-xs font-semibold text-gray-500">
                  Gender*
                </label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  {["Female", "Male", "Others"].map((g) => (
                    <button
                      key={g}
                      onClick={() =>
                        handleChange({ target: { name: "gender", value: g } })
                      }
                      className={`flex-1 py-2 text-sm transition-colors ${formData.gender === g
                        ? "bg-gray-100 font-semibold text-gray-900"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                        } ${g !== "Others" ? "border-r border-gray-300" : ""}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {touched.gender && !formData.gender && (
                  <span className="text-xs text-red-500 mt-1">Required</span>
                )}
              </div>


              <div className="flex-1 w-full flex flex-wrap gap-4 items-start ">
                <div className=" flex flex-col items-start ">
                  <label className="mb-3 text-xs font-semibold text-gray-500">
                    Age*
                  </label>
                  <div className="flex gap-2 justify-center">
                    <FloatingLabelInput
                      name="ageYY"
                      label="YY"
                      value={formData.ageYY}
                      onChange={handleChange}
                      error={errors.ageYY}
                      maxLength={3}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                    <FloatingLabelInput
                      name="ageMM"
                      label="MM"
                      value={formData.ageMM}
                      onChange={handleChange}
                      maxLength={2}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                    <FloatingLabelInput
                      name="ageDD"
                      label="DD"
                      value={formData.ageDD}
                      onChange={handleChange}
                      maxLength={2}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                  </div>
                  {errors.ageYY && (
                    <span className="text-xs text-red-500">{errors.ageYY}</span>
                  )}
                </div>
                <span className="self-start mt-5 text-gray-600 text-sm">OR</span>
                <div className="flex flex-col items-start">
                  <label className="mb-3 text-xs font-semibold text-gray-500">
                    Date of Birth*
                  </label>
                  <div className="flex gap-2 justify-center">
                    <FloatingLabelInput
                      name="dobYY"
                      label="YY"
                      value={formData.dobYY}
                      onChange={handleChange}
                      maxLength={4}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                    <FloatingLabelInput
                      name="dobMM"
                      label="MM"
                      value={formData.dobMM}
                      onChange={handleChange}
                      maxLength={2}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                    <FloatingLabelInput
                      name="dobDD"
                      label="DD"
                      value={formData.dobDD}
                      onChange={handleChange}
                      maxLength={2}
                      inputMode="numeric"
                      onKeyDown={blockNonDigits}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section>
          <h3 className="text-xs font-bold text-gray-800  mb-4 tracking-wide">
            Contact Details
          </h3>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-[48%] lg:w-[22%]">
                <InputField
                  name="address1"
                  placeholder="Address Line 1 *"
                  value={formData.address1}
                  onChange={handleChange}
                  error={
                    touched.address1 && !formData.address1 ? "Required" : null
                  }
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full md:w-[48%] lg:w-[22%]">
                <InputField
                  name="address2"
                  placeholder="Address Line 2 *"
                  value={formData.address2}
                  onChange={handleChange}
                  error={
                    touched.address2 && !formData.address2 ? "Required" : null
                  }
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full md:w-[23%] lg:w-[10%]">
                <InputField
                  name="pin"
                  placeholder="PIN*"
                  value={formData.pin}
                  onChange={handleChange}
                  error={touched.pin && errors.pin}
                  onBlur={handleBlur}
                  maxLength={6}
                  inputMode="numeric"
                  onKeyDown={blockNonDigits}
                />
              </div>
              <div className="w-full md:w-[23%] lg:w-[12%]">
                <SelectField
                  name="area"
                  label=""
                  options={["Area 1", "Area 2"]}
                  value={formData.area}
                  onChange={handleChange}
                  className="mt-0"
                />
              </div>
              <div className="w-full md:w-[23%] lg:w-[9%]">
                <InputField
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[23%] lg:w-[8%]">
                <InputField
                  name="district"
                  placeholder="District*"
                  value={formData.district}
                  onChange={handleChange}
                  onKeyDown={blockNonAlphabets}
                />
              </div>
              <div className="w-full md:w-[23%] lg:w-[8%]">
                <InputField
                  name="state"
                  placeholder="State*"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[13%] lg:w-[4%]">
                <InputField
                  name="country"
                  value="IN"
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 ">
              <div className="w-full md:w-[38%]">
                <InputField
                  name="primaryRegNo"
                  placeholder="Primary Registered Number*"
                  value={formData.primaryRegNo}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[38%]">
                <InputField
                  name="nextKinContact"
                  placeholder="Next Kin Contact No. *"
                  value={formData.nextKinContact}
                  onChange={handleChange}
                  error={touched.nextKinContact && errors.nextKinContact}
                  onBlur={handleBlur}
                  maxLength={10}
                  inputMode="numeric"
                  onKeyDown={blockNonDigits}
                />
              </div>
              <div className="w-full md:w-[20.5%]">
                <InputField
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full md:w-[38%]">
                <InputField
                  name="attendantName"
                  placeholder="Attendant Name"
                  value={formData.attendantName}
                  onChange={handleChange}
                  onKeyDown={blockNonAlphabets}
                />
              </div>
              <div className="w-full md:w-[38%]">
                <InputField
                  name="attendantRel"
                  placeholder="Attendant Relationship"
                  value={formData.attendantRel}
                  onChange={handleChange}
                  onKeyDown={blockNonAlphabets}
                />
              </div>
            </div>
          </div>
        </section>


        <section>
          <h3 className="text-xs font-bold text-gray-800  mb-4 tracking-wide">
            KYC Documents ( Optional )
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

            <div className="flex border border-gray-300 rounded-md overflow-hidden w-full md:w-auto">
              <div className="bg-gray-100 border-r  border-gray-300 px-3 py-2 relative">
                <select
                  name="docType"
                  value={formData.docType}
                  onChange={handleChange}
                  className="bg-transparent text-sm  font-medium text-gray-700 focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="" disabled>
                    DOC Type
                  </option>
                  {DOCUMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1 top-3 w-3 h-3 text-gray-500 pointer-events-none" />
              </div>
              <input
                type="text"
                name="docNumber"
                value={formData.docNumber || ""}
                onChange={handleChange}
                placeholder={
                  formData.docType
                    ? `Enter ${formData.docType} Number`
                    : "Enter Document Number"
                }
                className="px-3 py-2 w-full md:w-[400px] text-sm text-gray-700 focus:outline-none min-w-[200px]"
              />
            </div>

            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition-colors bg-white">
              <Upload size={16} />
              Upload Identity Proof
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".jpg,.jpeg,.pdf"
                multiple
              />
            </label>

            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition-colors bg-white">
              <SlidersHorizontal size={16} />
              Upload Address Proof
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".jpg,.jpeg,.pdf"
                multiple
              />
            </label>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.kycVerified}
                onChange={(e) =>
                  handleChange({
                    target: { name: "kycVerified", value: e.target.checked },
                  })
                }
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">KYC Verified</span>
            </div>
          </div>


          <div className="space-y-2">
            {files.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <CheckSquare size={18} className="text-gray-400" />
                <a
                  href={item.preview}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                  title="Open file"
                >
                  {item.file.name}
                </a>
                <span className="text-gray-500">Uploaded Successfully</span>
                <button
                  onClick={() => removeFile(idx)}
                  className="ml-2 text-gray-400 hover:text-red-500"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>


        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-6">Preferences</h3>


          <div className="flex flex-col md:flex-row gap-12 ">

            <div className="flex items-center justify-between w-full md:w-[35%] ">
              <div className="pr-4">
                <h4 className="text-sm font-semibold text-gray-800">
                  Consent for Medical Research
                </h4>
                <p className="text-[14px] font-semibold text-black/50 mt-1 leading-relaxed ">
                  These cookies are essential in order to use the website and
                  use its features.
                </p>
              </div>
              <div className="shrink-0">
                <ToggleSwitch
                  checked={formData.consentResearch}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, consentResearch: val }))
                  }
                />
              </div>
            </div>


            <div className="flex items-center justify-between w-full md:w-[35%] ">
              <div className="pr-4">
                <h4 className="text-sm font-semibold text-gray-800">
                  Communication Preferences
                </h4>
                <p className="text-[14px] font-semibold text-black/50 mt-1">
                  Default Communication Language
                </p>
              </div>
              <div className="shrink-0 min-w-[120px]">
                <SelectField
                  name="commLanguage"
                  options={COMMUNICATION_LANGUAGES}
                  value={formData.commLanguage}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>


      <div className="fixed bottom-0 left-0 w-full bg-gray-50 border-t border-gray-200 p-4 shadow-lg z-10">
        <div className="px-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <span className="text-gray-800 font-bold text-sm">
            Registration Charges : 200
          </span>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Collect Payment & Register
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
