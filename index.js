const container=document.getElementById('divLeft')
const image=document.getElementById('userAvatar')
const userLog=document.getElementsByTagName('span')[0]
const userName=document.getElementsByTagName('span')[1]
const userLocation=document.getElementsByTagName('span')[2]
const userTwitter=document.getElementsByTagName('span')[3]
const repoDiv=document.getElementById('divRight')

const fetchAvatar = async () => {
  const login=document.getElementById('userlogin').value
  const orgUrl = 'https://api.github.com/users/'+login
  try {
    const fetchResult = await fetch(orgUrl)
	  const orgData = await fetchResult.json()
	  const fetchAvatarResult = await fetch(orgData.avatar_url)
    const fetchReposResult = await fetch(orgData.repos_url)
    const repos = await fetchReposResult.json()
    const fetchLoginResult= orgData.login
    const fetchNameResult= orgData.name
    const fetchLocationResult= orgData.location
    const fetchTwitterResult= orgData.twitter_username
    let imgAvatar=fetchAvatarResult.url
    image.setAttribute("src", imgAvatar)
    userLog.innerHTML = fetchLoginResult
    userName.innerHTML = fetchNameResult
    userLocation.innerHTML = fetchLocationResult
    userTwitter.innerHTML=fetchTwitterResult
    let divdiv=document.createElement("div")
    divdiv.id="remDiv"
    divdiv.className="conteiner"
    repoDiv.appendChild(divdiv)
    for(i=0;i<repos.length;i++){
      let linkrepo=document.createElement("a")
      reponame=repos[i].name
      repohref=repos[i].url
      linkrepo.href=repohref
      linkrepo.innerHTML=reponame
      linkrepo.className="repoStyle"
      repohref=repos[i].html_url
      linkrepo.href=repohref
      divdiv.appendChild(linkrepo)
   }
  }
   catch(err) {
     userLog.innerHTML = "Օգտատերը չի գտնվել"
     userName.innerHTML=""
     userLocation.innerHTML="planet Earth"
     userTwitter.innerHTML=""
     image.setAttribute("src", "./5.png")
     console.log(err)
   }
}

const searchUser=()=>{
  if (repoDiv.childElementCount>0){
    const removDiv=document.getElementById("remDiv")
    removDiv.parentNode.removeChild(removDiv)
    fetchAvatar()
  }
  else{
    fetchAvatar()
  }
}
