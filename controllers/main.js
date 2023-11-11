let exerciseSection = document.querySelector(".tab-content");
let navPillsContent = "";
let tabPanesContent = "";
function thuDo(type, imgSrc_png) {
  if (type == "background") {
    document.querySelector(
      ".background"
    ).style.backgroundImage = `url(${imgSrc_png})`;
  } else if (type == "topclothes") {
    document.querySelector(".bikinitop").style.zIndex = 3;
    document.querySelector(
      ".bikinitop"
    ).innerHTML = `<img src="${imgSrc_png}" alt="${imgSrc_png}" class="w-100">`;
  } else if (type == "botclothes") {
    document.querySelector(".bikinibottom").style.zIndex = 2;
    document.querySelector(
      ".bikinibottom"
    ).innerHTML = `<img src="${imgSrc_png}" alt="${imgSrc_png}" class="w-100">`;
  } else if (type == "shoes") {
    document.querySelector(".feet").style.background = `url(${imgSrc_png})`;
  } else if (type == "handbags") {
    document.querySelector(".handbag").style.background = `url(${imgSrc_png})`;
  } else if (type == "necklaces") {
    document.querySelector(".necklace").style.background = `url(${imgSrc_png})`;
  } else if (type == "hairstyle") {
    document.querySelector(
      ".hairstyle"
    ).style.background = `url(${imgSrc_png})`;
  } else {
    console.log("Không có type này");
  }
}

fetch("../data/Data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetch có vấn đề");
    }
    return response.json();
  })
  .then((jsonResponse) => {
    jsonResponse.navPills.forEach((item, index) => {
      let navPilleSpecificClassName = index == 0 ? "active" : "";
      let tabPaneSpecificClassName = index == 0 ? "show active" : "";
      tabPanesContent += `<div class="row tab-pane fade ${tabPaneSpecificClassName}" id="${item.type}" role="tabpanel" aria-labelledby="${item.type}-tab">
        <div class="row"></div>
      </div>`;
      navPillsContent += `<li class="nav-item">
        <a class="nav-link ${navPilleSpecificClassName}" id="${item.type}-tab" data-toggle="tab" href="#${item.type}" role="tab" aria-controls="${item.type}" aria-selected="false">${item.showName}</a>
    </li>`;
    });
    exerciseSection.innerHTML = `
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        ${navPillsContent}
    </ul>
    <div class="tab-content px-5" id="myTabContent">
        ${tabPanesContent}
    </div>
`;
    jsonResponse.tabPanes.forEach((item) => {
      document.getElementById(item.type).querySelector(".row").innerHTML += `
                <div class="col-12 col-md-6 col-lg-3 my-3">
                    <img class="w-100" src="${item.imgSrc_jpg}" alt="${item.imgSrc_jpg}">
                    <p class="text-center font-weight-bold">${item.name}</p>
                    <button class="btn btn-success w-100" onclick="thuDo('${item.type}', '${item.imgSrc_png}')">Thử</button>
                </div>
        `;
    });
  })
  .catch((error) => {
    console.error("Lỗi:", error);
  });
