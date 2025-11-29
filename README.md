# Healthligence - Patient Registration Portal

## **Real Email Service Integrated**
**Note:** This project features a fully functional email service integration. If you enter a **valid email address** in the registration form and submit it, you will receive an actual confirmation email containing your registration details in a structured table format.

## Live Demo
**My Deployed Project Link:** [https://healthligence.netlify.app/](https://healthligence.netlify.app/)

---

## Project Overview
This project is a technical assessment submission for a Frontend Developer role. The goal was to recreate a pixel-perfect, responsive Patient Registration UI based on a provided Figma design, ensuring strict adherence to spacing, colors, typography, and layout.

The application consists of two main screens:
1.  **New Patient Registration Form**: A comprehensive form with real-time validations, document uploads, and dynamic field behavior.
2.  **Registration Success Screen**: A confirmation page displaying the generated UHID and Bill Number.

## Features

### 1. Form Functionalities & Validations
-   **Mobile Number**: Validates for exactly 10 digits.
-   **Name Fields**: Accepts alphabets only (min. 2 characters).
-   **Age & DOB Sync**: Entering Age automatically calculates DOB and vice-versa. Validates age between 0-120.
-   **Email**: Standard email format validation.
-   **PIN Code**: Validates for 6 digits.
-   **Next of Kin Contact**: Validates for 10 digits.
-   **Dynamic Submit Button**: The "Collect Payment & Register" button remains disabled until all required fields are valid and at least one ID proof is uploaded.

### 2. Document Uploads
-   Supports **Aadhar Card, PAN Card, Driving Licence, and Passport**.
-   Accepts **JPG or PDF** formats only.
-   Displays uploaded file names with an option to remove them.

### 3. Email Integration (EmailJS)
-   Integrated **EmailJS** to send real-time confirmation emails.
-   Upon successful registration, the user receives an email with their details formatted in a clean table.

### 4. UI/UX & Design
-   **Pixel-Perfect Design**: Matches the provided Figma mockup exactly.
-   **Responsive Layout**: Optimized for various screen sizes.
-   **Custom Components**: Modular architecture using reusable components like `FormField`, `SuccessScreen`, etc.
-   **Tailwind CSS**: Utilized for modern, utility-first styling.

## Tech Stack
-   **Frontend Framework**: ReactJS (Functional Components + Hooks)
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React, React Icons
-   **Email Service**: EmailJS (@emailjs/browser)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
-   Node.js installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Patient
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your EmailJS credentials (optional for UI testing, required for email feature):
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the URL shown in your terminal).

## Project Structure
```
src/
├── components/
│   ├── Header.jsx           # Application header
│   ├── RegistrationForm.jsx # Main form component
│   ├── FormField.jsx        # Reusable input field component
│   ├── SuccessScreen.jsx    # Registration success display
│   └── ...
├── services/
│   └── emailService.js      # EmailJS configuration and sending logic
├── App.jsx                  # Main application entry
└── main.jsx                 # React DOM rendering
```

## Assessment Details
-   **Goal**: Recreate the exact UI and functionalities from the Figma design.
-   **Figma Link**: [Healthligence Design](https://www.figma.com/design/UNw7hDKQxh0n9hscZn5p27/Healthligence)
-   **Submission Requirements**: GitHub repository and hosted link.

## Screenshots

### Registration Screen

<img width="1901" height="920" alt="Screenshot 2025-11-29 210120" src="https://github.com/user-attachments/assets/7056dd43-4b09-41c6-8fde-a93f70b73aee" />


### Success Screen

<img width="1898" height="911" alt="Screenshot 2025-11-29 211918" src="https://github.com/user-attachments/assets/99c03bf0-7518-4888-9c7e-4c7e1439c398" />


### Email Inbox

<img width="1455" height="612" alt="Screenshot 2025-11-29 210708" src="https://github.com/user-attachments/assets/ca878997-300c-49da-a23f-9484404008cb" />



---
*Developed by Rajan*
