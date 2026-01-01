let submittedData = JSON.parse(localStorage.getItem("submittedData")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myform");

  console.log("form loaded:", form); // should NOT be null
  displayUser();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let userDetails = {
      userName: document.getElementById("name").value.trim(),
      userEmail: document.getElementById("email").value.trim(),
      userMobile: document.getElementById("mobile").value.trim(),
      dateOfbirth: document.getElementById("date").value,
      college: document.getElementById("college").value.trim(),
      degreeName: document.getElementById("degree").value.trim(),
      domainName: document.getElementById("domain").value,
      userResume: document.getElementById("pdf_file").files[0] || null,
    };

    submittedData.push(userDetails);
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
    console.log("submittedData:", submittedData);
    displayUser();
    form.reset();
  };

  form.addEventListener("submit", handleSubmit);

  const validateForm = () => {
    let isValid = true;

    document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

    let userName = document.getElementById("name").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let userMobile = document.getElementById("mobile").value.trim();
    let dateOfbirth = document.getElementById("date").value;
    let collegeName = document.getElementById("college").value.trim();
    let degreeName = document.getElementById("degree").value.trim();
    let domainName = document.getElementById("domain").value;
    let userResume = document.getElementById("pdf_file").files[0];

    if (userName === "") {
      document.getElementById("nameError").textContent = "Name is required";
      isValid = false;
    }
    if (userEmail === "") {
      document.getElementById("emailError").textContent = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      document.getElementById("emailError").textContent = "Invalid email";
      isValid = false;
    }
    if (userMobile === "") {
      document.getElementById("mobileError").textContent =
        "Mobile number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(userMobile)) {
      document.getElementById("mobileError").textContent =
        "Invalid mobile number";
      isValid = false;
    }
    if (!dateOfbirth) {
      document.getElementById("dateError").textContent =
        "Date of birth is required";
      isValid = false;
    }
    if (degreeName === "") {
      document.getElementById("degreeError").textContent = "Degree is required";
      isValid = false;
    }
    if (collegeName === "") {
      document.getElementById("collegeError").textContent =
        "College is required";
      isValid = false;
    }
    if (domainName === "") {
      document.getElementById("domainError").textContent = "Select a domain";
      isValid = false;
    }

    if (!userResume) {
      document.getElementById("resumeError").textContent = "Resume required";
      isValid = false;
    }

    return isValid;
  };
});

const displayUser = () => {
  const output = document.getElementById("output");
  output.innerHTML = ""; // clear before re-render

  submittedData.forEach((data, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-all p-4 mb-3";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-blue-800 mb-2">${index + 1} - ${
      data.userName
    }</h3>
      <p class="text-gray-800 mb-1"><span class="font-medium">Email:</span> ${
        data.userEmail
      }</p>
      <p class="text-gray-800 mb-1"><span class="font-medium">Mobile:</span> ${
        data.userMobile
      }</p>
      <p class="text-gray-800 mb-1"><span class="font-medium">College:</span> ${
        data.college
      }</p>
      <p class="text-gray-800 mb-1"><span class="font-medium">Degree:</span> ${
        data.degreeName
      }</p>
      <p class="text-gray-800 mb-1"><span class="font-medium">Domain:</span> ${
        data.domainName
      }</p>
      
    `;
    output.appendChild(card);
  });
};
