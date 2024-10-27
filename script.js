function openForm(button) {
  const courseId = button.closest('.course').getAttribute('data-course-id');
  document.getElementById('enrollForm').style.display = 'flex';
  sessionStorage.setItem('selectedCourse', courseId);
  window.currentEnrollButton = button;
}

function closeForm() {
  document.getElementById('enrollForm').style.display = 'none';
}

function enrollCourse(event) {
  event.preventDefault();
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('payment').value = '';

  const selectedCourse = sessionStorage.getItem('selectedCourse');
  const courseElement = document.querySelector(`.course[data-course-id="${selectedCourse}"]`);
  courseElement.querySelector('.enroll-btn').textContent = 'Enrolled';
  courseElement.querySelector('.enroll-btn').classList.add('enrolled');
  sessionStorage.setItem('isEnrolled_' + selectedCourse, 'true');

  setTimeout(() => {
    successMessage.style.display = 'none';
    closeForm();
  }, 3000);

  if (window.currentEnrollButton) {
    window.currentEnrollButton.textContent = "Enrolled";
    window.currentEnrollButton.disabled = true;
    window.currentEnrollButton.classList.add("disabled");
  }
}

function submitForm() {
  const name = document.getElementById("name_signup").value;
  const email = document.getElementById("email_signup").value;
  const course = document.getElementById("course").value;
  document.getElementById("formMessage").innerText = `Thank you, ${name}! You have signed up for the ${course} course.`;
  document.getElementById("signupForm").reset();
  return false;
}


function goToPaymentPage() {
  const selectedCourse = document.getElementById("course").value;
  sessionStorage.setItem('selectedCourse', selectedCourse);
  document.getElementById("payment_signup").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
  return false;
}

function processPayment() {
  const name = document.getElementById("name_signup").value;
  const selectedCourse = sessionStorage.getItem('selectedCourse');
  document.getElementById("payment_signup").style.display = "none";
  document.getElementById("formMessage").innerText = `Thank you, ${name}! You have successfully signed up for the ${selectedCourse.replace('-', ' ')} course.`;
  document.getElementById("formMessage").style.display = "block";

  const courseMapping = {
    "web-development": 1,
    "data-science": 2,
    "java-full-stack": 3,
    "python-full-stack": 4,
    "salesforce-development": 5,
    "devops": 6,
    "prompt-engineering": 7,
    "generative-ai": 8,
  };

  const courseId = courseMapping[selectedCourse];
  const enrollButton = document.querySelector(`.course[data-course-id="${courseId}"] .enroll-btn`);
  if (enrollButton) {
    enrollButton.textContent = 'Enrolled';
    enrollButton.classList.add('enrolled');
  }

  return false;
}

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  navLinks.classList.remove("active");
});




function enrollCourse(event) {
  event.preventDefault();
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('payment').value = '';

  const selectedCourse = sessionStorage.getItem('selectedCourse');
  const courseElement = document.querySelector(`.course[data-course-id="${selectedCourse}"]`);
  courseElement.querySelector('.enroll-btn').textContent = 'Enrolled';
  courseElement.querySelector('.enroll-btn').classList.add('enrolled');
  sessionStorage.setItem('isEnrolled_' + selectedCourse, 'true');

  setTimeout(() => {
    successMessage.style.display = 'none';
    closeForm();
  }, 3000);

  if (window.currentEnrollButton) {
    window.currentEnrollButton.textContent = "Enrolled";
    window.currentEnrollButton.disabled = true;
    window.currentEnrollButton.classList.add("disabled");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.course').forEach(course => {
    const courseId = course.getAttribute('data-course-id');
    if (sessionStorage.getItem('isEnrolled_' + courseId) === 'true') {
      const enrollButton = course.querySelector('.enroll-btn');
      enrollButton.textContent = 'Enrolled';
      enrollButton.classList.add('enrolled');
      
      setTimeout(() => {
        sessionStorage.removeItem('isEnrolled_' + courseId);
        enrollButton.textContent = 'Enroll Now';
        enrollButton.classList.remove('enrolled');
      }, 3600000);
    }
  });
});

function resetEnrollment() {
  const enrolledButtons = document.querySelectorAll('.enroll-btn.enrolled');
  enrolledButtons.forEach(button => {
    button.textContent = 'Enroll Now';
    button.classList.remove('enrolled');
  });
}

window.onload = function() {
  resetEnrollment();
};
