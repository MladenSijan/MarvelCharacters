# MarvelCharacters
JavaScript application based on Marvel's API calls responsible for getting data about characters  and using it for interactive actions.

<h2>Instructions how to run the application</h2>
<ul type="disc">
<li>You only have to download a source code and run index.html file. Pretty simple.</li>
</ul>

<h2>Description</h2>
<ul type="disc">
  <li>Application is done in HTML, CSS and JavaScript(jQuery as well) with no additional frameworks. I've decided to do styling from scratch and custom responsive grid layout</li>
  <li>It's html structure is simple and is dynamicly changed by JS when user is typing in search input.</li>
  <li>When you begin to type character's name API call to Marvel is made and the output is being generated according to what you have typed.</li>
  <li>What I had to do is to hash private and public key and generate timestamp that are required to pass as ajax parameters along with data in input.</li>
  <li>Since there's a functionality where you can click on desired character so you cmove it if it's already existing. an bookmark him, I've decided to make a transfer object, that would store its data and provide methods to save it to local storage or remove it if it's already existing.</li>
  <li>Also made several functions that would check the existence of character in local storage, and ones that would dinamically change partial views on client based on that if you're searching or want to view your bookmarked characters.</li>
  <li>I ensured that data and images are displayed consistently responsive on all devices.</li>
</ul>
