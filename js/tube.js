let fetchData = [];
// This function adding category name in UI
const categoryHandler = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const items = data.data;
  addCategoty(items);
};

// adding category list container div
const addCategoty = (items) => {
  const containerDiv = document.getElementById("category-container");
  containerDiv.innerHTML = "";
  items.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick='cardHandler(${category.category_id});'  class="tab bg-slate-200 rounded  tab-lifted ">${category.category}</button>`;

    containerDiv.appendChild(div);
  });
};

// This function adding Cards name in UI
const cardHandler = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const items = data.data;
  fetchData = items;

  // cards container div
  const containerDiv = document.getElementById("cards-container");
  containerDiv.innerHTML = "";
  const noDataContainer = document.getElementById("no-data-container");
  noDataContainer.innerHTML = "";
  if (items.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img class="mx-auto" src="./images/Icon.png" alt="" />
    <h1 class="text-5xl text-black font-bold">Oops!! Sorry, There is no <br> content here</h1>
    `;
    noDataContainer.appendChild(div);
    return;
  }

  items.forEach((cardData) => {
    // convert second to hour and minutes
    const second = cardData.others?.posted_date;
    const secondNum = parseInt(second);
    let minutes = secondNum / 60;
    let hour = minutes / 60;
    minutes = minutes % 60;
    minutes = minutes.toFixed(0);
    hour = hour.toFixed(0);

    const div = document.createElement("div");
    div.classList.add("ml-3");
    div.innerHTML = `
    <div class="card max-w-sm max-h-80 bg-base-100 shadow-xl">
        <figure>
          <img src=${
            cardData.thumbnail
          } alt="thumbnail"  class=" w-full h-48" />
        </figure>
        <div class="mt-5 flex flex-row gap-4 p-4">
          <div>
            <img
              class="w-14 h-14 rounded-full"
              src=${cardData.authors[0]?.profile_picture}
              alt="profile-pic"
            />
          </div>
          <div class="space-y-2">
            <h2 class="card-title">${cardData.title}</h2>
            <p class="text-gray-400 inline">
             ${cardData.authors[0]?.profile_name}
          ${
            cardData.authors[0]?.verified
              ? `<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_11_215)">
                <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
              </g>
              <defs>
                <clipPath id="clip0_11_215">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>`
              : ""
          }
            </p>
            <p class="text-gray-400">${
              cardData.others?.views ? cardData.others?.views : "NO"
            } <span>views</span></p>
          </div>

          ${
            cardData.others?.posted_date
              ? `<p  class="absolute rounded right-3 bottom-40 text-white bg-black px-2 py-1">${hour} hrs ${minutes} min ago</p>`
              : ""
          }
         
        </div>
      </div>`;
    containerDiv.appendChild(div);
  });
};

const sortCards = () => {
  fetchData.sort((small, large) => {
    return parseFloat(large.others.views) - parseFloat(small.others.views);
  });
  const containerDiv = document.getElementById("cards-container");
  containerDiv.innerHTML = "";
  const noDataContainer = document.getElementById("no-data-container");
  noDataContainer.innerHTML = "";
  if (fetchData.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img class="mx-auto" src="./images/Icon.png" alt="" />
    <h1 class="text-5xl text-black font-bold">Oops!! Sorry, There is no <br> content here</h1>
    `;
    noDataContainer.appendChild(div);
    return;
  }

  // sort by view function
  fetchData.forEach((cardData) => {
    // convert second to hour and minutes
    const second = cardData.others?.posted_date;
    const secondNum = parseInt(second);
    let minutes = secondNum / 60;
    let hour = minutes / 60;
    minutes = minutes % 60;
    minutes = minutes.toFixed(0);
    hour = hour.toFixed(0);

    const div = document.createElement("div");
    div.classList.add("ml-3");
    div.innerHTML = `
    <div class="card max-w-sm max-h-80 bg-base-100 shadow-xl">
        <figure>
          <img src=${
            cardData.thumbnail
          } alt="thumbnail"  class=" w-full h-48" />
        </figure>
        <div class="mt-5 flex flex-row gap-4 p-4">
          <div>
            <img
              class="w-14 h-14 rounded-full"
              src=${cardData.authors[0]?.profile_picture}
              alt="profile-pic"
            />
          </div>
          <div class="space-y-2">
            <h2 class="card-title">${cardData.title}</h2>
            <p class="text-gray-400 inline">
             ${cardData.authors[0]?.profile_name}
          ${
            cardData.authors[0]?.verified
              ? `<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_11_215)">
                <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
              </g>
              <defs>
                <clipPath id="clip0_11_215">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>`
              : ""
          }
            </p>
            <p class="text-gray-400">${
              cardData.others?.views ? cardData.others?.views : "NO"
            } <span>views</span></p>
          </div>

          ${
            cardData.others?.posted_date
              ? `<p  class="absolute rounded right-3 bottom-40 text-white bg-black px-2 py-1">${hour} hrs ${minutes} min ago</p>`
              : ""
          }
         
        </div>
      </div>`;
    containerDiv.appendChild(div);
  });
};

categoryHandler();
cardHandler(1000);
