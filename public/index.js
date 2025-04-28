const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
      // Load state from localStorage
      const storedState = localStorage.getItem(checkbox.id);
      if (storedState) {
        checkbox.checked = JSON.parse(storedState); //JSON.parse(storedState)
      } 
      // Save state on change
      checkbox.addEventListener('change', function() {
        localStorage.setItem(this.id, JSON.stringify(this.checked));
      });
    });