const getProfile = async (event) => {

  console.log(event);
  console.log(event.target);
  inputValue = document.querySelector("input");

  const url = inputValue.value;
  console.log(url);
  const parent = event.target.parentNode;
  const error=document.querySelector(".error")
  if(error){
  parent.removeChild(error);}

  const profiles = document.querySelector(".profiles");
  try {
    if (document.querySelector(`.profile_${url}`) != null) {
      console.log("rrr");
      const errorMessage = document.createElement("div");
      errorMessage.innerHTML = "This profile already exists";
      errorMessage.className = "error";
      parent.appendChild(errorMessage); 
      throw new Error("This profile already exists");

    }
    const res = await fetch(`https://api.github.com/users/${url}`);
    if(res.status===404){
      console.log("rrrrrr");
      const errorMessage = document.createElement("div");
      errorMessage.innerHTML = "This profile does not exist";
      errorMessage.className = "error";
      parent.appendChild(errorMessage); 
      throw new Error("This profile does not exist");

    }
    const data = await res.json();
    console.log(res);
    console.log("*",data);
    const profilePicDiv = document.createElement("img");
    profilePicDiv.className = "pic";
    profilePicDiv.src = data.avatar_url;

    const profileNameDiv = document.createElement("div");
    profileNameDiv.className = "name";
    profileNameDiv.innerText = data.login;
    const profileRepoNumDiv = document.createElement("div");
    profileRepoNumDiv.className = "repNum";
    profileRepoNumDiv.innerText = data.public_repos;
    const profile = document.createElement("div");
    const link = document.createElement("a");
    link.href = data.html_url;
    profile.className = `profile_${url}`;

    link.appendChild(profile);
    profile.appendChild(profilePicDiv);
    profile.appendChild(profileNameDiv);
    profile.appendChild(profileRepoNumDiv);
    profiles.appendChild(link);
    clearValue();
  } catch (err) {
    console.log(err);
    clearValue();

  }
};

const clearValue = () => {
  const input = document.querySelector("input");
  input.value = "";
};

const button = document.querySelector("button");
console.log(button);
button.addEventListener("click", getProfile);
button.addEventListener("change", getProfile);
// button.addEventListener("click", clearValue);
