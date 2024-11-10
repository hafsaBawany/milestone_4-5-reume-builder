// References to DOM elements
const form: HTMLFormElement = document.getElementById('resume-form') as HTMLFormElement;
const resumeSection: HTMLElement = document.querySelector('.resume-container') as HTMLElement;
const formSection: HTMLElement = document.querySelector('.form-container') as HTMLElement;

const resumeName: HTMLElement = document.getElementById('resume-name') as HTMLElement;
const resumeAge: HTMLElement = document.getElementById('resume-age') as HTMLElement;
const resumeEmail: HTMLElement = document.getElementById('resume-email') as HTMLElement;
const resumeEducation: HTMLElement = document.getElementById('resume-education') as HTMLElement;
const resumeSkills: HTMLElement = document.getElementById('resume-skills') as HTMLElement;
const resumeCertifications: HTMLElement = document.getElementById('resume-certifications') as HTMLElement;
const resumeLanguages: HTMLElement = document.getElementById('resume-languages') as HTMLElement;
const resumeInterests: HTMLElement = document.getElementById('resume-interests') as HTMLElement;
const resumeProfilePic: HTMLImageElement = document.getElementById('resume-profile-pic') as HTMLImageElement;

const resetButton: HTMLButtonElement = document.getElementById('reset-form') as HTMLButtonElement;
const editButton: HTMLButtonElement = document.getElementById('edit-resume') as HTMLButtonElement;
const downloadButton: HTMLButtonElement = document.getElementById('download-resume') as HTMLButtonElement;

// Function to generate the resume
function generateResume(event: Event): void {
    event.preventDefault();

    const formData: FormData = new FormData(form);

    const name: string = formData.get('name') as string;
    const age: string = formData.get('age') as string;
    const email: string = formData.get('email') as string;
    const education: string = formData.get('education') as string;
    const skills: string = formData.get('skills') as string;
    const certifications: string = formData.get('certifications') as string;
    const languages: string = formData.get('languages') as string;
    const interests: string = formData.get('interests') as string;
    const profilePic: File | null = formData.get('profile-pic') as File;

    // Set resume details
    resumeName.textContent = name;
    resumeAge.textContent = `Age: ${age}`;
    resumeEmail.textContent = `Email: ${email}`;
    resumeEducation.textContent = education;
    resumeSkills.textContent = skills;
    resumeCertifications.textContent = certifications;
    resumeLanguages.textContent = languages;
    resumeInterests.textContent = interests;

    // Display profile picture
    if (profilePic) {
        const reader: FileReader = new FileReader();
        reader.onload = function () {
            resumeProfilePic.src = reader.result as string;
        };
        reader.readAsDataURL(profilePic);
    }

    // Show the resume section and hide the form
    formSection.style.display = 'none';
    resumeSection.style.display = 'block';
}

//  to reset 
function resetForm(): void {
    form.reset();
    formSection.style.display = 'block';
    resumeSection.style.display = 'none';
}

// For editing....
function enableEditMode(): void {
    
    resumeName.innerHTML = `<input type="text" value="${resumeName.textContent}" />`;
    resumeAge.innerHTML = `<input type="text" value="${resumeAge.textContent.replace('Age: ', '')}" />`;
    resumeEmail.innerHTML = `<input type="text" value="${resumeEmail.textContent.replace('Email: ', '')}" />`;
    resumeEducation.innerHTML = `<textarea>${resumeEducation.textContent}</textarea>`;
    resumeSkills.innerHTML = `<textarea>${resumeSkills.textContent}</textarea>`;
    resumeCertifications.innerHTML = `<textarea>${resumeCertifications.textContent}</textarea>`;
    resumeLanguages.innerHTML = `<textarea>${resumeLanguages.textContent}</textarea>`;
    resumeInterests.innerHTML = `<textarea>${resumeInterests.textContent}</textarea>`;

    // abe yaaaar neend a rahi hai 
    resumeProfilePic.innerHTML = `<input type="file" id="new-profile-pic" />`;

    //  'Save'
    editButton.textContent = 'Save';
    editButton.onclick = saveChanges;
}


function saveChanges(): void {
    // Save edited infooo
    const updatedName: string = (resumeName.querySelector('input') as HTMLInputElement).value;
    const updatedAge: string = (resumeAge.querySelector('input') as HTMLInputElement).value;
    const updatedEmail: string = (resumeEmail.querySelector('input') as HTMLInputElement).value;
    const updatedEducation: string = (resumeEducation.querySelector('textarea') as HTMLTextAreaElement).value;
    const updatedSkills: string = (resumeSkills.querySelector('textarea') as HTMLTextAreaElement).value;
    const updatedCertifications: string = (resumeCertifications.querySelector('textarea') as HTMLTextAreaElement).value;
    const updatedLanguages: string = (resumeLanguages.querySelector('textarea') as HTMLTextAreaElement).value;
    const updatedInterests: string = (resumeInterests.querySelector('textarea') as HTMLTextAreaElement).value;

    // Update resume with new values
    resumeName.textContent = updatedName;
    resumeAge.textContent = `Age: ${updatedAge}`;
    resumeEmail.textContent = `Email: ${updatedEmail}`;
    resumeEducation.textContent = updatedEducation;
    resumeSkills.textContent = updatedSkills;
    resumeCertifications.textContent = updatedCertifications;
    resumeLanguages.textContent = updatedLanguages;
    resumeInterests.textContent = updatedInterests;

    
    editButton.textContent = 'Edit Resume';
    editButton.onclick = enableEditMode;
}

Function to download the resume as an HTML file
function downloadResume(): void {
    const resumeContent: string = document.querySelector('.resume-container')?.outerHTML || '';
    
    const blob: Blob = new Blob([resumeContent], { type: 'text/html' });
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
}

// Event listeners
form.addEventListener('submit', generateResume);
resetButton.addEventListener('click', resetForm);
editButton.addEventListener('click', enableEditMode);
downloadButton.addEventListener('click', downloadResume);
