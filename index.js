
$(document).ready(getFromLocalStorage);


function createCardHtml(timestamp, title , body , quality) {
var cardHTML =
    `<div class="card-container" id="${timestamp}">
        <h2 class="title-of-card"> ${title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">${body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality"> quality: <span class="qualityVariable"> ${quality}</span></p>
        <hr>
    </div>`
return cardHTML
};


function addCardToPage(cardHTML){
    var bottomBox = $('.bottom-box');
 
    $('.bottom-box').prepend(cardHTML);

  } 
    $('.bottom-box').on('click', function(event){

    if (event.target.className === 'delete-button'){

      deleteCard(event);
  }   else if (event.target.className==='upvote'||event.target.className==='downvote'){
      changeQuality(event);

  }
})




$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var title = $('.title-input').val();
    var body = $('.body-input').val();
    var qualityVariable = "swill";
    var id = Date.now();
    var cardHTML = createCardHtml(id, title, body, qualityVariable);
    addCardToPage(cardHTML);
    addToLocalStorage(id, cardHTML);
    clearInputs();

});
   


function clearInputs(){
  $('.title-input').val("");
  $('.body-input').val("");
}


function addToLocalStorage(id, cardHTML) {
  localStorage.setItem(id, cardHTML);
}


function getFromLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var cardHTML = localStorage.getItem(timeStamp);
    addCardToPage(cardHTML);
  }
}



function changeQuality(event){
 var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();

  if (event.target.className==='upvote'){
    upVote(event, currentQuality);
  } else {
    downVote(event, currentQuality)
  }
}


function upVote(event, currentQuality){
 if (currentQuality==='swill'){
    $($(event.target).siblings('p.quality').children()[0]).text('plausible');
    changeQualityLocalStorage(event, 'plausible');
  }else if (currentQuality==='plausible'){
    $($(event.target).siblings('p.quality').children()[0]).text('genius');
    changeQualityLocalStorage(event, 'genius');
  }

}

function downVote(event, currentQuality){
 if (currentQuality==='genius'){
    $($(event.target).siblings('p.quality').children()[0]).text('plausible');
    changeQualityLocalStorage(event, 'plausible');
  }else if (currentQuality==='plausible'){
    $($(event.target).siblings('p.quality').children()[0]).text('swill');
    changeQualityLocalStorage(event, 'swill');
  }

}





function changeQualityLocalStorage(event, qualityVariable) {
  var cardHTML = $(event.target).closest('.card-container');
  var cardHTMLId = cardHTML[0].id;
  console.log('cardHTML outerHTML', cardHTML[0].outerHTML);
  var cardObjectInJSON = localStorage.setItem(cardHTMLId, cardHTML[0].outerHTML);
 
}


function deleteCard(event){
    var cardHTML = $(event.target).closest('.card-container').remove();
    var cardHTMLId = cardHTML[0].id;
    localStorage.removeItem(cardHTMLId);

}


// function freezeButtons(){

//     if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       
   


// }










