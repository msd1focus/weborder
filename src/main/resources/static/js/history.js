"use strict";

function populate_history() {
  var objpo = JSON.parse(datapo);
  var jpo = objpo.length;
  var tabobj = document.getElementById("conftab");
  var i;
  for (i=0; i<2; i++) {
    tabobj.insertRow(1+i).outerHTML = '<tr><td>' +objpo[i].submit_date+ '</td>' +
                                          '<td>' +objpo[i].po_number+ '</td>' +
                                          '<td>' +objpo[i].po_date+ '</td>' +
                                          '<td>' +objpo[i].ship_to+ '</td>' +
                                          '<td>' +objpo[i].total+ '</td>' +
                                          '<td><input type="button" value="Click untuk detail" style="width:10em; border:none; background-color:white;" '+
                                                      'onclick="showdetail(this);"/>' +
                                          '</tr>';
  }
}

function showdetail(obj) {
  document.getElementById("cell_ponumber").innerHTML = obj.parentElement.parentElement.children[1].innerHTML;
  document.getElementById("cell_podate").innerHTML = obj.parentElement.parentElement.children[0].innerHTML;

  var objpo = JSON.parse(datapo);
  var objitems = objpo[0].order_detail;
  var tab = document.getElementById("rincianorder");

  for (var i=0; i<objitems.length; i++) {
    tab.insertRow(i).outerHTML= '<tr><td>' + objitems[i].product_code + '</td>' +
                              '<td>' +  objitems[i].product_name + '</td>' +
                              '<td>' +  'Dus' + '</td>' +
                              '<td>' + '20.000</td>' +
                              '<td>' + '30</td>' +
                              '<td>' + '600.000</td></tr>';
    }

  document.getElementById("myModal").style.display = "block";
}
