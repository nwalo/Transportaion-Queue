function allowDrop(ev) {
  ev.preventDefault()
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id)
}

function drop1(ev) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  ev.target.appendChild(document.getElementById(data))

  var value = ev.target.id + document.getElementById(data).textContent
  var val = value.replace(/ /g, '').replace(/\n/g, '')

  console.log(val)

  $('#check1').attr('checked', 'checked')
  $('#input1').attr('value', val)
  setTimeout(() => {
    $('#form1').submit()
  }, 1000)

  console.log($('#input1').attr('value').length)
}

function drop2(ev) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  ev.target.appendChild(document.getElementById(data))
  var value = ev.target.id + document.getElementById(data).textContent
  var val = value.replace(/ /g, '').replace(/\n/g, '')

  console.log(val)

  $('#check2').attr('checked', 'checked')
  $('#input2').attr('value', val)
  setTimeout(() => {
    $('#form2').submit()
  }, 1000)
}

function drop3(ev) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  ev.target.appendChild(document.getElementById(data))
  var value = ev.target.id + document.getElementById(data).textContent
  var val = value.replace(/ /g, '').replace(/\n/g, '')
  console.log(val)
  $('#check3').attr('checked', 'checked')
  $('#input3').attr('value', val)
  setTimeout(() => {
    $('#form3').submit()
  }, 1000)
}

function drop4(ev) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  ev.target.appendChild(document.getElementById(data))
  var value = ev.target.id + document.getElementById(data).textContent
  var val = value.replace(/ /g, '').replace(/\n/g, '')
  console.log(val)
  $('#check4').attr('checked', 'checked')
  $('#input4').attr('value', val)
  setTimeout(() => {
    $('#form4').submit()
  }, 1000)
}

// const today = new Date();
// const options = {
// 	weekday: 'long'
// };
// const tomorrow = new Date(today);
// tomorrow.setDate(tomorrow.getDate() + 1);

// console.log(today.toLocaleDateString('en-us', { weekday: 'long' }));
// console.log(today.toLocaleDateString());
// console.log(tomorrow.getDate());
