// References to DOM elements
var form = document.getElementById('resume-form');
var resumeSection = document.querySelector('.resume-container');
var formSection = document.querySelector('.form-container');
var resumeName = document.getElementById('resume-name');
var resumeAge = document.getElementById('resume-age');
var resumeEmail = document.getElementById('resume-email');
var resumeEducation = document.getElementById('resume-education');
var resumeSkills = document.getElementById('resume-skills');
var resumeCertifications = document.getElementById('resume-certifications');
var resumeLanguages = document.getElementById('resume-languages');
var resumeInterests = document.getElementById('resume-interests');
var resumeProfilePic = document.getElementById('resume-profile-pic');
var resetButton = document.getElementById('reset-form');
var editButton = document.getElementById('edit-resume');
var downloadButton = document.getElementById('download-resume');
// Function to generate the resume
function generateResume(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var name = formData.get('name');
    var age = formData.get('age');
    var email = formData.get('email');
    var education = formData.get('education');
    var skills = formData.get('skills');
    var certifications = formData.get('certifications');
    var languages = formData.get('languages');
    var interests = formData.get('interests');
    var profilePic = formData.get('profile-pic');
    // Set resume details
    resumeName.textContent = name;
    resumeAge.textContent = "Age: ".concat(age);
    resumeEmail.textContent = "Email: ".concat(email);
    resumeEducation.textContent = education;
    resumeSkills.textContent = skills;
    resumeCertifications.textContent = certifications;
    resumeLanguages.textContent = languages;
    resumeInterests.textContent = interests;
    // Display profile picture
    if (profilePic) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            resumeProfilePic.src = reader_1.result;
        };
        reader_1.readAsDataURL(profilePic);
    }
    // Show the resume section and hide the form
    formSection.style.display = 'none';
    resumeSection.style.display = 'block';
}
// Function to reset the form
function resetForm() {
    form.reset();
    formSection.style.display = 'block';
    resumeSection.style.display = 'none';
}
// Function to enable editing mode
function enableEditMode() {
    // Switch to editable fields
    resumeName.innerHTML = "<input type=\"text\" value=\"".concat(resumeName.textContent, "\" />");
    resumeAge.innerHTML = "<input type=\"text\" value=\"".concat(resumeAge.textContent.replace('Age: ', ''), "\" />");
    resumeEmail.innerHTML = "<input type=\"text\" value=\"".concat(resumeEmail.textContent.replace('Email: ', ''), "\" />");
    resumeEducation.innerHTML = "<textarea>".concat(resumeEducation.textContent, "</textarea>");
    resumeSkills.innerHTML = "<textarea>".concat(resumeSkills.textContent, "</textarea>");
    resumeCertifications.innerHTML = "<textarea>".concat(resumeCertifications.textContent, "</textarea>");
    resumeLanguages.innerHTML = "<textarea>".concat(resumeLanguages.textContent, "</textarea>");
    resumeInterests.innerHTML = "<textarea>".concat(resumeInterests.textContent, "</textarea>");
    // Switch the profile pic input
    resumeProfilePic.innerHTML = "<input type=\"file\" id=\"new-profile-pic\" />";
    // Change edit button text to 'Save'
    editButton.textContent = 'Save';
    editButton.onclick = saveChanges;
}
// Function to save changes after editing
function saveChanges() {
    // Save edited values
    var updatedName = resumeName.querySelector('input').value;
    var updatedAge = resumeAge.querySelector('input').value;
    var updatedEmail = resumeEmail.querySelector('input').value;
    var updatedEducation = resumeEducation.querySelector('textarea').value;
    var updatedSkills = resumeSkills.querySelector('textarea').value;
    var updatedCertifications = resumeCertifications.querySelector('textarea').value;
    var updatedLanguages = resumeLanguages.querySelector('textarea').value;
    var updatedInterests = resumeInterests.querySelector('textarea').value;
    // Update resume with new values
    resumeName.textContent = updatedName;
    resumeAge.textContent = "Age: ".concat(updatedAge);
    resumeEmail.textContent = "Email: ".concat(updatedEmail);
    resumeEducation.textContent = updatedEducation;
    resumeSkills.textContent = updatedSkills;
    resumeCertifications.textContent = updatedCertifications;
    resumeLanguages.textContent = updatedLanguages;
    resumeInterests.textContent = updatedInterests;
    // Switch to non-editable mode
    editButton.textContent = 'Edit Resume';
    editButton.onclick = enableEditMode;
}
// Function to download the resume as an HTML file
function downloadResume() {
    var _a;
    var resumeContent = ((_a = document.querySelector('.resume-container')) === null || _a === void 0 ? void 0 : _a.outerHTML) || '';
    var blob = new Blob([resumeContent], { type: 'text/html' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
}
// Event listeners
form.addEventListener('submit', generateResume);
resetButton.addEventListener('click', resetForm);
editButton.addEventListener('click', enableEditMode);
downloadButton.addEventListener('click', downloadResume);
