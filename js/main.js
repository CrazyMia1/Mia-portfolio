
const photoInput = document.getElementById('photoInput');
const avatar = document.getElementById('avatar');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const updatedAt = document.getElementById('updatedAt');

const editableIds = ['nameField','roleField','bioField','locField','emailField','workField','skillsField'];
const initialValues = {};

editableIds.forEach(id => {
  initialValues[id] = document.getElementById(id).innerText;
});


photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please choose an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatar.src = ev.target.result;
    updateTimestamp();
  };
  reader.readAsDataURL(file);
});


let editing = false;
editBtn.addEventListener('click', () => {
  editing = true;
  toggleEditing(true);
});

saveBtn.addEventListener('click', () => {
  editing = false;
  toggleEditing(false);
  updateTimestamp();
});

resetBtn.addEventListener('click', () => {
  if (confirm('Reset profile fields to default?')) {
    editableIds.forEach(id => {
      document.getElementById(id).innerText = initialValues[id];
    });
    avatar.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop";
    updateTimestamp();
  }
});

function toggleEditing(isEditing){
  editableIds.forEach(id => {
    const el = document.getElementById(id);
    el.contentEditable = isEditing ? "true" : "false";
    if (isEditing) el.focus();
  });
  editBtn.style.display = isEditing ? 'none' : 'inline-block';
  saveBtn.style.display = isEditing ? 'inline-block' : 'none';
}

function updateTimestamp(){
  const now = new Date();
  updatedAt.innerText = now.toLocaleString();
}


updateTimestamp();
