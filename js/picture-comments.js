'use strict';

(function () {
  var COMMETNS_COUNT = 5;

  var socialComments = document.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();
  var currentCommentsCount = document.querySelector('.comments-current');
  var allCommentsCount = document.querySelector('.comments-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var comments;
  var count;

  commentsLoader.classList.add('hidden');

  commentsLoader.addEventListener('click', function () {
    count += COMMETNS_COUNT;
    if (count >= comments.length) {
      count = comments.length;
      commentsLoader.classList.add('hidden');
    }
    currentCommentsCount.textContent = count;
    render(comments.slice(0, count));
  });

  function show(data) {
    comments = data;
    allCommentsCount.textContent = data.length;

    if (data.length > COMMETNS_COUNT) {
      commentsLoader.classList.remove('hidden');
      count = COMMETNS_COUNT;
    } else {
      count = data.length;
    }

    currentCommentsCount.textContent = count;
    render(comments.slice(0, count));
  }

  function render(data) {
    data.forEach(function (comment) {
      fragment.append(create(socialComment, comment));
    });

    socialComments.innerHTML = '';
    socialComments.append(fragment);
  }

  function create(comment, commentData) {
    var newComment = comment.cloneNode(true);
    var avatar = newComment.querySelector('.social__picture');
    var commentText = newComment.querySelector('.social__text');

    avatar.src = commentData.avatar;
    avatar.alt = commentData.name;
    commentText.textContent = commentData.message;

    return newComment;
  }

  window.pictureComments = {
    show: show,
  };

})();
