let data = {};

fetch('topics.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    populateClassDropdown();
  });

function populateClassDropdown() {
  const classSelect = document.getElementById('classSelect');
  Object.keys(data).forEach(cls => {
    const option = document.createElement('option');
    option.value = cls;
    option.textContent = cls;
    classSelect.appendChild(option);
  });

  classSelect.addEventListener('change', function () {
    populateSubjects(this.value);
  });
}

function populateSubjects(selectedClass) {
  const subjectSelect = document.getElementById('subjectSelect');
  const topicSelect = document.getElementById('topicSelect');
  subjectSelect.innerHTML = '<option value="">Select Subject</option>';
  topicSelect.innerHTML = '<option value="">Select Topic</option>';
  topicSelect.disabled = true;
  subjectSelect.disabled = false;

  Object.keys(data[selectedClass]).forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  subjectSelect.addEventListener('change', function () {
    populateTopics(selectedClass, this.value);
  });
}

function populateTopics(selectedClass, selectedSubject) {
  const topicSelect = document.getElementById('topicSelect');
  topicSelect.innerHTML = '<option value="">Select Topic</option>';
  topicSelect.disabled = false;

  Object.keys(data[selectedClass][selectedSubject]).forEach(topic => {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });

  topicSelect.addEventListener('change', function () {
    displayExplanation(selectedClass, selectedSubject, this.value);
  });
}

function displayExplanation(cls, subject, topic) {
  const output = document.getElementById('outputBox');
  output.innerHTML = `<h3>${topic}</h3><p>${data[cls][subject][topic]}</p>`;
}
