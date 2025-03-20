// import React, { useState, useEffect, ReactNode } from "react";
import {FieldDefinition, BaseItem, CustomModalProps} from '../../types'

// // Define field types for form fields
// export type FieldType =
//   | "text"
//   | "number"
//   | "email"
//   | "password"
//   | "select"
//   | "textarea"
//   | "checkbox"
//   | "date"
//   | "time"
//   | "radio";

// // Field definition interface
// export interface FieldDefinition {
//   id: string;
//   label: string;
//   type: FieldType;
//   placeholder?: string;
//   options?: { value: string; label: string }[];
//   required?: boolean;
//   helperText?: string;
//   disabled?: boolean;
//   min?: number;
//   max?: number;
//   pattern?: string;
//   rows?: number; // For textarea
//   cols?: number; // For textarea
// }

// // Base item interface that can be extended for specific use cases
// export interface BaseItem {
//   id?: string;
//   isActive?: boolean;
//   [key: string]: any;
// }

// // Modal props interface
// export interface CustomModalProps<T extends BaseItem> {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: "add" | "edit" | "view" | "delete" | "confirm";
//   fields?: FieldDefinition[];
//   item?: T;
//   onSave: (item: T) => void;
//   title: string;
//   subtitle?: string;
//   size?: "sm" | "md" | "lg" | "xl" | "full";
//   showFooter?: boolean;
//   customFooter?: ReactNode;
//   confirmText?: string;
//   cancelText?: string;
//   children?: ReactNode;
//   showToggle?: boolean;
//   toggleLabel?: string;
//   className?: string;
//   isLoading?: boolean;
// }

// // Toggle component for enabling/disabling items
// const Toggle: React.FC<{
//   checked: boolean;
//   onChange: () => void;
//   disabled?: boolean;
//   label?: string;
// }> = ({ checked, onChange, disabled = false, label }) => {
//   return (
//     <div className="flex items-center gap-2">
//       {label && <span className="text-sm text-gray-600">{label}</span>}
//       <button
//         type="button"
//         onClick={onChange}
//         disabled={disabled}
//         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//           checked ? "bg-purple-600" : "bg-gray-200"
//         } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//       >
//         <span
//           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//             checked ? "translate-x-6" : "translate-x-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// };

// // CustomModal Component
// function CustomModal<T extends BaseItem>({
//   isOpen,
//   onClose,
//   mode,
//   fields = [],
//   item,
//   onSave,
//   title,
//   subtitle,
//   size = "md",
//   showFooter = true,
//   customFooter,
//   confirmText,
//   cancelText = "Cancel",
//   children,
//   showToggle = false,
//   toggleLabel = "Active",
//   className = "",
//   isLoading = false,
// }: CustomModalProps<T>) {
//   const [formData, setFormData] = useState<Record<string, any>>(
//     item || ({} as T)
//   );

//   useEffect(() => {
//     if (isOpen && item) {
//       setFormData(item);
//     } else if (isOpen) {
//       // Reset form when opening in add mode
//       setFormData({} as T);
//     }
//   }, [isOpen, item]);

//   const handleChange = (fieldId: string, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldId]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (mode === "view" || mode === "delete") {
//       onClose();
//       return;
//     }

//     // For edit mode, maintain the original ID
//     const dataToSave = {
//       ...formData,
//       id:
//         mode === "edit" && item?.id
//           ? item.id
//           : formData.id || Date.now().toString(),
//     } as T;

//     onSave(dataToSave);
//     onClose();
//   };

//   const renderField = (field: FieldDefinition) => {
//     const isDisabled = mode === "view" || field.disabled;
//     const value = formData[field.id] !== undefined ? formData[field.id] : "";

//     const baseInputClass = `w-full px-3 py-2 border border-reloadBorder rounded-custom8px text-cardTitle focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//       isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
//     } border-gray-300`;

//     switch (field.type) {
//       case "select":
//         return (
//           <select
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             disabled={isDisabled}
//             className={baseInputClass}
//           >
//             <option value="">Select {field.label}</option>
//             {field.options?.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         );
//       case "textarea":
//         return (
//           <textarea
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             placeholder={field.placeholder || ""}
//             disabled={isDisabled}
//             rows={field.rows || 4}
//             cols={field.cols}
//             className={baseInputClass}
//           />
//         );
//       case "checkbox":
//         return (
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id={field.id}
//               checked={value || false}
//               onChange={(e) => handleChange(field.id, e.target.checked)}
//               disabled={isDisabled}
//               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
//               {field.helperText || field.label}
//             </label>
//           </div>
//         );
//       case "radio":
//         return (
//           <div className="flex flex-col space-y-2">
//             {field.options?.map((option) => (
//               <div key={option.value} className="flex items-center">
//                 <input
//                   type="radio"
//                   id={`${field.id}-${option.value}`}
//                   name={field.id}
//                   value={option.value}
//                   checked={value === option.value}
//                   onChange={(e) => handleChange(field.id, e.target.value)}
//                   disabled={isDisabled}
//                   className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor={`${field.id}-${option.value}`}
//                   className="ml-2 text-sm text-gray-700"
//                 >
//                   {option.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         );
//       case "date":
//         return (
//           <input
//             type="date"
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             disabled={isDisabled}
//             className={baseInputClass}
//           />
//         );
//       case "time":
//         return (
//           <input
//             type="time"
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             disabled={isDisabled}
//             className={baseInputClass}
//           />
//         );
//       case "number":
//         return (
//           <input
//             type="number"
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             placeholder={field.placeholder || ""}
//             disabled={isDisabled}
//             min={field.min}
//             max={field.max}
//             className={baseInputClass}
//           />
//         );
//       case "email":
//       case "password":
//       case "text":
//       default:
//         return (
//           <input
//             type={field.type || "text"}
//             id={field.id}
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//             placeholder={field.placeholder || ""}
//             disabled={isDisabled}
//             pattern={field.pattern}
//             className={baseInputClass}
//           />
//         );
//     }
//   };

//   if (!isOpen) return null;

//   const modalTitle =
//     title ||
//     {
//       add: "Add New Item",
//       edit: "Edit Item",
//       view: "View Item Details",
//       delete: "Confirm Delete",
//       confirm: "Confirm Action",
//     }[mode];

//   const submitButtonText =
//     confirmText ||
//     {
//       add: "Save",
//       edit: "Save Changes",
//       view: "Close",
//       delete: "Delete",
//       confirm: "Confirm",
//     }[mode];

//   // Modal size classes
//   const sizeClasses = {
//     sm: "max-w-sm",
//     md: "max-w-md",
//     lg: "max-w-lg",
//     xl: "max-w-xl",
//     full: "max-w-full mx-4",
//   }[size];

//   // Button classes based on mode
//   const buttonClasses = {
//     add: "text-[12px] font-inter font-[500px] bg-bgButton text-whiteColor ",
//     edit: "text-[12px] font-inter font-[500px] bg-bgButton text-whiteColor",
//     view: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
//     delete: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
//     confirm: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
//   }[mode];

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Modal Backdrop */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <div
//         className={`bg-white rounded-custom18px shadow-xl w-full ${sizeClasses} z-10 overflow-hidden transform transition-all ${className}`}
//       >
//         {/* Modal Header */}
//         <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack">
//               {modalTitle}
//             </h3>
//             {subtitle && (
//               <p className="text-[12px] font-inter font-[500] text-paragraphBlack0 mt-1">
//                 {subtitle}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center justify-end">
//             {/* {mode === 'add' && <span className="px-4 py-1 text-[12px] font-inter font-[500] text-paragraphBlack">New</span>} */}
//             <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack focus:outline-none focus:ring-2 focus:ring-blue-500 justify-end"
//                   >
//                     {/* {cancelText} */}

//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         clip-rule="evenodd"
//                         d="M5.15128 5.15152C5.61991 4.68289 6.3797 4.68289 6.84833 5.15152L11.9998 10.303L17.1513 5.15152C17.6199 4.68289 18.3797 4.68289 18.8483 5.15152C19.317 5.62015 19.317 6.37995 18.8483 6.84858L13.6969 12L18.8483 17.1515C19.317 17.6202 19.317 18.3799 18.8483 18.8486C18.3797 19.3172 17.6199 19.3172 17.1513 18.8486L11.9998 13.6971L6.84833 18.8486C6.3797 19.3172 5.61991 19.3172 5.15128 18.8486C4.68265 18.3799 4.68265 17.6202 5.15128 17.1515L10.3027 12L5.15128 6.84858C4.68265 6.37995 4.68265 5.62015 5.15128 5.15152Z"
//                         fill="#636363"
//                       />
//                     </svg>
//                   </button>
//             {mode === "delete" && (
//               <span className="px-4 py-1 bg-red-600 text-white text-sm rounded-full">
//                 Delete
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Modal Body */}
//         <form onSubmit={handleSubmit} className="px-6 py-4">
//           {/* For confirmation or delete modals */}
//           {mode === "confirm" && (
//             <div className="py-4">
//               {children || (
//                 <p className="text-gray-700">
//                   Are you sure you want to proceed?
//                 </p>
//               )}
//             </div>
//           )}

//           {mode === "delete" && (
//             <div className="py-4">
//               {children || (
//                 <p className="text-gray-700">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Form fields or custom content */}
//           {mode !== "confirm" && mode !== "delete" && (
//             <>
//               {children || (
//                 <div className="space-y-4">
//                   {fields.map((field) => (
//                     <div key={field.id} className="space-y-1">
//                       <label
//                         htmlFor={field.id}
//                         className="block text-[12px] font-inter font-[500] text-paragraphBlack"
//                       >
//                         {field.label}{" "}
//                         {field.required && (
//                           <span className="text-red-500"></span>
//                         )}
//                       </label>
//                       {renderField(field)}
//                       {field.helperText && (
//                         <p className="text-text-[12px] font-inter font-[500] text-paragraphBlack mt-1">
//                           {field.helperText}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* Modal Footer */}
//           {showFooter && (
//             <div className="mt-6 flex justify-between items-center">
//               <div>
//                 {showToggle && mode !== "add" && (
//                   <Toggle
//                     checked={formData.isActive || false}
//                     onChange={() =>
//                       handleChange("isActive", !formData.isActive)
//                     }
//                     disabled={mode === "view"}
//                     label={toggleLabel}
//                   />
//                 )}
//               </div>
//               {customFooter || (
//                 <div className="flex space-x-3">
                  
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses} ${
//                       isLoading ? "opacity-75 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Processing...</span>
//                       </div>
//                     ) : (
//                       submitButtonText
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CustomModal;






import React, { useState, useEffect, ReactNode } from "react";

// Define field types for form fields


// Field definition interface


// Base item interface that can be extended for specific use cases



// Toggle component for enabling/disabling items
const Toggle: React.FC<{
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
}> = ({ checked, onChange, disabled = false, label }) => {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-purple-600" : "bg-gray-200"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

// File upload component
const ImageUpload: React.FC<{
  value: string | File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');

  useEffect(() => {
    // Handle initial value
    if (typeof value === 'string' && value) {
      setImagePreview(value);
    } else if (value instanceof File) {
      setImagePreview(URL.createObjectURL(value));
      setFileName(value.name);
      setFileSize(`${(value.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  }, [value]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      onChange(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (disabled) return;
    
    if (imagePreview) {
      // Only revoke if it's a blob URL (created by URL.createObjectURL)
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    }
    
    setImagePreview('');
    setFileName('');
    setFileSize('');
    onChange(null);
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mx-auto h-24 w-24 object-cover rounded"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-gray-400 mb-2">Drop item here or Browse file</div>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            {!disabled && (
              <>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={disabled}
                />
                <label
                  htmlFor="file-upload"
                  className={`mt-2 inline-block ${disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-blue-600 hover:text-blue-800'} text-sm`}
                >
                  Browse
                </label>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Display file info if uploaded */}
      {fileName && (
        <div className="mt-3 p-3 border border-gray-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
              <img
                src={imagePreview}
                alt="Thumbnail"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">{fileSize}</p>
            </div>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// CustomModal Component
const  CustomModal= <T extends BaseItem>({
  isOpen,
  onClose,
  mode,
  fields = [],
  item,
  onSave,
  title,
  subtitle,
  size = "md",
  showFooter = true,
  customFooter,
  confirmText,
  cancelText = "Cancel",
  children,
  showToggle = false,
  toggleLabel = "Active",
  className = "",
  isLoading = false,
  formLayout = "standard",
  gridColumns = 2,
}: CustomModalProps<T>)  => {
  const [formData, setFormData] = useState<Record<string, any>>(
    item || ({} as T)
  );

  useEffect(() => {
    if (isOpen && item) {
      setFormData(item);
    } else if (isOpen) {
      // Reset form when opening in add mode
      setFormData({} as T);
    }
  }, [isOpen, item]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "view" || mode === "delete") {
      onClose();
      return;
    }

    // For edit mode, maintain the original ID
    const dataToSave = {
      ...formData,
      id:
        mode === "edit" && item?.id
          ? item.id
          : formData.id || Date.now().toString(),
    } as T;

    onSave(dataToSave);
    onClose();
  };

  const renderField = (field: FieldDefinition) => {
    const isDisabled = mode === "view" || field.disabled;
    const value = formData[field.id] !== undefined ? formData[field.id] : "";

    const baseInputClass = `w-full px-3 py-2 border border-reloadBorder rounded-custom8px text-cardTitle focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
    } border-gray-300 ${field.inputClassName || ""}`;

    // If field has custom render function, use it
    if (field.customRender) {
      return field.customRender({
        value,
        onChange: (newValue) => handleChange(field.id, newValue),
        disabled: isDisabled
      });
    }

    switch (field.type) {
      case "image-upload":
        return (
          <ImageUpload
            value={value}
            onChange={(file) => handleChange(field.id, file)}
            disabled={isDisabled}
          />
        );
      case "select":
        return (
          <div className="relative">
            <select
              id={field.id}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={isDisabled}
              className={baseInputClass}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );
      case "textarea":
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ""}
            disabled={isDisabled}
            rows={field.rows || 4}
            cols={field.cols}
            className={baseInputClass}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
              {field.helperText || field.label}
            </label>
          </div>
        );
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  disabled={isDisabled}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case "date":
        return (
          <input
            type="date"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isDisabled}
            className={baseInputClass}
          />
        );
      case "time":
        return (
          <input
            type="time"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isDisabled}
            className={baseInputClass}
          />
        );
      case "number":
        return (
          <input
            type="number"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ""}
            disabled={isDisabled}
            min={field.min}
            max={field.max}
            className={baseInputClass}
          />
        );
      case "file":
        return (
          <input
            type="file"
            id={field.id}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                handleChange(field.id, files[0]);
              }
            }}
            disabled={isDisabled}
            className={baseInputClass}
          />
        );
      case "email":
      case "password":
      case "text":
      default:
        return (
          <input
            type={field.type || "text"}
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ""}
            disabled={isDisabled}
            pattern={field.pattern}
            className={baseInputClass}
          />
        );
    }
  };

  if (!isOpen) return null;

  const modalTitle =
    title ||
    {
      add: "Add New Item",
      edit: "Edit Item",
      view: "View Item Details",
      delete: "Confirm Delete",
      confirm: "Confirm Action",
    }[mode];

  const submitButtonText =
    confirmText ||
    {
      add: "Save",
      edit: "Save Changes",
      view: "Close",
      delete: "Delete",
      confirm: "Confirm",
    }[mode];

  // Modal size classes
  const sizeClasses = {
    sm: "max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl",
    md: "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl",
    lg: "max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl",
    xl: "max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl",
    full: "max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-4",
  }[size];
  

  // Button classes based on mode
  const buttonClasses = {
    add: "text-[12px] font-inter font-[500px] bg-bgButton text-whiteColor ",
    edit: "text-[12px] font-inter font-[500px] bg-bgButton text-whiteColor",
    view: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
    delete: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    confirm: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  }[mode];

  // Render fields based on layout
  const renderFormFields = () => {
    if (formLayout === "grid") {
      return (
        <div className={`grid grid-cols-1 md:grid-cols-${gridColumns} sm:grid-cols-${gridColumns}  lg:grid-cols-${gridColumns} xl:grid-cols-${gridColumns} gap-4`}>
          {fields.map((field) => (
            <div 
              key={field.id} 
              className={`space-y-1 ${field.fullWidth ? `col-span-1 md:col-span-${gridColumns}` : ''} ${field.containerClassName || ''}`}
            >
              <label
                htmlFor={field.id}
                className="block text-[12px] font-inter font-[500] text-paragraphBlack"
              >
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-500"></span>
                )}
              </label>
              {renderField(field)}
              {field.helperText && (
                <p className="text-text-[12px] font-inter font-[500] text-paragraphBlack mt-1">
                  {field.helperText}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    } else if (formLayout === "custom") {
      // For custom layout, just render children
      return children;
    } else {
      // Standard layout (vertical stacking)
      return (
        <div className="space-y-4">
          {fields.map((field) => (
            <div 
              key={field.id} 
              className={`space-y-1 ${field.containerClassName || ''}`}
            >
              <label
                htmlFor={field.id}
                className="block text-[12px] font-inter font-[500] text-paragraphBlack"
              >
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-500"></span>
                )}
              </label>
              {renderField(field)}
              {field.helperText && (
                <p className="text-text-[12px] font-inter font-[500] text-paragraphBlack mt-1">
                  {field.helperText}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`bg-white rounded-custom18px shadow-xl w-full ${sizeClasses} z-10 overflow-hidden transform transition-all ${className}`}
      >
        {/* Modal Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack">
              {modalTitle}
            </h3>
            {subtitle && (
              <p className="text-[12px] font-inter font-[500] text-paragraphBlack0 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end">
            {/* {mode === 'add' && <span className="px-4 py-1 text-[12px] font-inter font-[500] text-paragraphBlack">New</span>} */}
            <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack focus:outline-none focus:ring-2 focus:ring-blue-500 justify-end"
                  >
                    {/* {cancelText} */}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.15128 5.15152C5.61991 4.68289 6.3797 4.68289 6.84833 5.15152L11.9998 10.303L17.1513 5.15152C17.6199 4.68289 18.3797 4.68289 18.8483 5.15152C19.317 5.62015 19.317 6.37995 18.8483 6.84858L13.6969 12L18.8483 17.1515C19.317 17.6202 19.317 18.3799 18.8483 18.8486C18.3797 19.3172 17.6199 19.3172 17.1513 18.8486L11.9998 13.6971L6.84833 18.8486C6.3797 19.3172 5.61991 19.3172 5.15128 18.8486C4.68265 18.3799 4.68265 17.6202 5.15128 17.1515L10.3027 12L5.15128 6.84858C4.68265 6.37995 4.68265 5.62015 5.15128 5.15152Z"
                        fill="#636363"
                      />
                    </svg>
                  </button>
            {mode === "delete" && (
              <span className="px-4 py-1 bg-red-600 text-white text-sm rounded-full">
                Delete
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* For confirmation or delete modals */}
          {mode === "confirm" && (
            <div className="py-4">
              {children || (
                <p className="text-gray-700">
                  Are you sure you want to proceed?
                </p>
              )}
            </div>
          )}

          {mode === "delete" && (
            <div className="py-4">
              {children || (
                <p className="text-gray-700">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              )}
            </div>
          )}

          {/* Form fields or custom content */}
          {mode !== "confirm" && mode !== "delete" && (
            <>
              {formLayout === "custom" ? children : renderFormFields()}
            </>
          )}

          {/* Modal Footer */}
          {showFooter && (
            <div className="mt-6 flex justify-between items-center">
              <div>
                {showToggle && mode !== "add" && (
                  <Toggle
                    checked={formData.isActive || false}
                    onChange={() =>
                      handleChange("isActive", !formData.isActive)
                    }
                    disabled={mode === "view"}
                    label={toggleLabel}
                  />
                )}
              </div>
              {customFooter || (
                <div className="flex space-x-3">
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses} ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      submitButtonText
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CustomModal;
