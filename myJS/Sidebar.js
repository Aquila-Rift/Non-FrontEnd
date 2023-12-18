document.getElementById('button-open').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
  });
  
  document.getElementById('button-close').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
  });
  