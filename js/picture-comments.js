'use strict';

(function () {
  var socialComments = document.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();
  var commentsCount = document.querySelector('.comments-count');

  var socialCommentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  function render(comments) {
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    commentsCount.textContent = comments.length;

    comments.forEach(function (comment) {
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
    render: render,
  };

})();
