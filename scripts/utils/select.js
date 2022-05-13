function dropdownSelect() {
    document.getElementById("dropdown-content").classList.toggle("show");
    let arrowDown = document.getElementById("arrow_icon");
    arrowDown.innerHTML = '<i class="fas fa-angle-up"></i>';
  }

  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          let arrowDown = document.getElementById("arrow_icon");
          arrowDown.innerHTML = '<i class="fas fa-angle-down"></i>';
        }
      }
    }
  }

