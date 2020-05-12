




// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1lGRmLk1cjZWHXbtgvQHH-y8POFO7eV6lfQtp3dTbEpfnlbblE_AZ9IUxG48PHdSb9LmqD2ildN5F/pub?gid=0&single=true&output=csv';


var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQv_QDwI-5bLDQVH4a3kBuuIdKrGvuNYd4uOVtRjJRJduUHPN_kcmYYxPIPrgXiKENlPTiuXYZs_Ypb/pub?gid=898080687&single=true&output=csv'

function initTable() {
  Papa.parse(public_spreadsheet_url, {
    download: true,
    header: true,
    complete: saveData
  })
}

window.addEventListener('DOMContentLoaded', initTable)


var topics = {};
topics["Cosmology"] = true;
topics["Simulations"] = true;
topics["Galaxies"] = true;
topics["Earth and Planetary"] = true;
topics["High Energy"] = true;
topics["Instrumentation"] = true;
topics["Solar and Stellar"] = true;

$(document).ready(function() {

  $(".checkbox").change(function() {
    topics[this.id] = this.checked;
    console.log(topics);
    showInfo();
  });

});

function saveData(results) {
    window.data = results.data
    showInfo();
}

function showInfo() {

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
  table.id = 'phd-places-table';

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);
  var columns = ['Group','Institution','Topics','Website','Email'];

  for (var i=0; i<columns.length; i++) {
    var tabCell = tr.insertCell(-1);
    tabCell.onclick =  sortTable;
    tabCell.id = i;
    tabCell.innerHTML = '<span class="table_header">'+columns[i]+"</span>";
  }

  for (var j = 0; j < window.data.length; j++) {

      d = window.data[j];
      var tr = table.insertRow(-1);
      console.log(d);
      var inc = false;

      var group_topics = d['Topics'].split(",");
      console.log(group_topics);

      for (var i=0; i<group_topics.length; i++) {

        console.log(group_topics[i], topics[group_topics[i].trim()]);
        if (topics[group_topics[i].trim()]) {
          inc = true;
        }
      }

      if (inc) {

        for (var i=0; i<columns.length; i++) {

          var tabCell = tr.insertCell(-1);
          column = columns[i];



          if (column==='Website') {
              tabCell.innerHTML = '<a href="'+d['Website']+'">website</a>';
            } else if (column==='Email') {
              tabCell.innerHTML = '<a href="mailto:'+d['Email']+'">email</a>';
            } else {
              tabCell.innerHTML = d[column];
          }

        }

      }

  }

  var divContainer = document.getElementById("phd-places-table-container");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

}







function sortTable() {

  n = parseInt(this.id);
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("phd-places-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
