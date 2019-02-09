import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Starter StackGen</h1>
      <h2>Front End Amazement</h2>

      <input
        id="yesbutton"
        class="button-style button-style-left"
        type="button"
        onclick="yesClicked()"
        value="yes"
      />
      <input
        id="nobutton"
        class="button-style button-style-right"
        type="button"
        onclick="toggleUI()"
        value="no"
      />

      <div id="introLabel">Was this page helpful?</div>
      <div id="extroLabel" style="display:none;">
        Thank you for helping improve our documentation!
      </div>
      <div id="commentsLabel" style="display:none;">
        Feedback about this page?
      </div>

      <form id="csatform">
        <input
          type="text"
          name="comments"
          id="comments"
          style="display:none; "
        />
        <input type="hidden" name="rating" id="rating" value="10" />
        <input type="hidden" name="atlasId" id="atlasId" value="0" />
        <input type="hidden" name="userId" id="userId" value="100" />
      </form>

      <input
        id="submitButton"
        class="button-style"
        type="button"
        onclick="submitClicked()"
        value="submit"
        style="display: none;"
      />
    </div>
  );
}

function submit() {
  // grab values one by one from the form up above and then set on the this.data JSON object
  // this.data =  . csatform.get comments

  // go for it

  this.data.userId = $("#userId").val();
  this.data.atlasId = $("#atlasId").val();
  this.data.comments = $("#comments").val();
  this.data.rating = $("#rating").val();

  // alert(JSON.stringify(this.data));

  // Using the core $.ajax() method
  $.ajax({
    // The URL for the request

    url: "http://localhost:8099/Csat/{param}",
    // The data to send (will be converted to a query string)
    data: JSON.stringify(this.data),
    // Whether this is a POST or GET request
    type: "POST",
    // The type of data we expect back
    // dataType : "json",
    contentType: "application/json",
    accept: "application/json"
  })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!" + JSON.stringify(xhr) + ":" + status);
      // alert( "Error: " + JSON.stringify(errorThrown ))+ " Status: " + JSON.stringify(status ) );
      //TODO: create Jira ticket assign to internal docs and support team.
    })
    // Code to run regardless of success or failure;
    .always(function(xhr, status) {
      showThankyou();
    });
}

var data = {
  userId: 0,
  atlasId: 0,
  comments: "Your real feelings",
  rating: 10
};

function submitClicked() {
  $("#rating").text.val = "0";
  toggleComponent("#yesbutton");
  toggleComponent("#nobutton");
  toggleComponent("#introLabel");
  submit();
}

function yesClicked() {
  toggleComponent("#yesbutton");
  toggleComponent("#nobutton");
  toggleComponent("#introLabel");
  submit();
}

function toggleUI() {
  toggleComponent("#comments");
  toggleComponent("#yesbutton");
  toggleComponent("#nobutton");
  toggleComponent("#introLabel");
  toggleComponent("#submitButton");
  toggleComponent("#commentsLabel");
}

function showThankyou() {
  toggleComponent("#extroLabel");
  toggleComponent("#commentsLabel");
}

/**
  setting to opposite of it's current state of visbility 
*/
function toggleComponent(component) {
  var c = $(component);

  if (!c.is(":hidden")) {
    $(c).hide("fast", function() {
      // Animation complete.
    });
  } else {
    $(c).show("slow", function() {
      // Animation complete.
    });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
