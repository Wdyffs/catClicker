(function () {
  const model = {
    init: function () {
      this.catsList = [
        {
          id: 1,
          imgSrc: "cat1.png",
          name: "Jully",
          clickerCounter: 0,
          isActive: true,
        },
        {
          id: 2,
          imgSrc: "cat2.jpg",
          name: "Fred",
          clickerCounter: 0,
          isActive: false,
        },
        {
          id: 3,
          imgSrc: "cat3.jpg",
          name: "Winston",
          clickerCounter: 0,
          isActive: false,
        },
        {
          id: 4,
          imgSrc: "cat4.jpg",
          name: "Wilie",
          clickerCounter: 0,
          isActive: false,
        },
        {
          id: 5,
          imgSrc: "cat5.jpg",
          name: "Sparky",
          clickerCounter: 0,
          isActive: false,
        },
        {
          id: 6,
          imgSrc: "cat6.jpg",
          name: "Shilla",
          clickerCounter: 0,
          isActive: false,
        },
      ];
    },
    getCatsList: function () {
      return this.catsList;
    },
    getActiveCat: function () {
      return this.getCatsList().find((cat) => cat.isActive);
    },
    setActiveCat: function (catId) {
      this.getActiveCat().isActive = false;
      this.getCatsList().find((cat) => cat.id === catId).isActive = true;
    },
    updateClicks: function () {
      ++this.getActiveCat().clickerCounter;
    },
    saveChanges: function (changes) {
      Object.assign(this.getActiveCat(), changes);
    },
  };
  const controller = {
    init: function () {
      model.init();
      view.init();
    },
    getCats: function () {
      return model.getCatsList();
    },
    getActiveCat: function () {
      return model.getActiveCat();
    },
    setAcitiveCate: function (catId) {
      model.setActiveCat(catId);
      view.render();
    },
    updateCatClickerCount: function () {
      model.updateClicks();
    },
    saveCat: function (cat) {
      model.saveChanges(cat);
      view.render();
    },
  };
  const view = {
    init: function () {
      catsButtonListView.init();
      catCardView.init();
      adminPaneView.init();
      this.render();
    },
    render: function () {
      catCardView.render();
      adminPaneView.render();
    },
  };
  const catsButtonListView = {
    init: function () {
      const buttonsBlock = document.querySelector(".buttonsBlock");
      const cats = controller.getCats();
      for (let i = 0; i < cats.length; i++) {
        const catButton = document.createElement("button");
        const catId = cats[i].id;
        catButton.textContent = "Cat #" + (i + 1);
        catButton.addEventListener("click", () => {
          controller.setAcitiveCate(catId);
        });
        buttonsBlock.append(catButton);
      }
    },
    render: function () {},
  };
  const catCardView = {
    init: function () {
      const catArea = document.querySelector(".catArea");
      const catCardBlock = document.querySelector(".catCardBlock");
      this.catImage = document.querySelector(".catImage");
      this.catNameParagraph = document.querySelector(".catName");
      this.catClickCounter = document.querySelector(".counter");

      this.catImage.addEventListener("click", () => {
        const cat = controller.getActiveCat();
        controller.updateCatClickerCount(cat.name);
        this.catClickCounter.textContent =
          controller.getActiveCat().clickerCounter;
      });
    },
    render: function () {
      const cat = controller.getActiveCat();
      this.catImage.src = cat.imgSrc;
      this.catNameParagraph.textContent = cat.name;
      this.catClickCounter.textContent = cat.clickerCounter;
    },
  };
  const adminPaneView = {
    init() {
      this.adminButton = document.querySelector(".adminMode");
      this.adminPane = document.querySelector(".adminPane");

      this.inputName = document.querySelector("#name");
      this.inputUrl = document.querySelector("#url");
      this.inputClicks = document.querySelector("#clickCount");

      this.adminButton.addEventListener("click", () => {
        this.adminPane.style.display = "block";
      });

      this.saveBtn = document.querySelector("#save");
      this.cancelBtn = document.querySelector("#cancel");

      this.cancelBtn.addEventListener("click", () => {
        const currentCat = controller.getActiveCat();
        this.inputName.value = currentCat.name;
        this.inputUrl.value = currentCat.imgSrc;
        this.inputClicks.value = currentCat.clickerCounter;
        this.adminPane.style.display = "none";
      });

      this.saveBtn.addEventListener("click", (e) => {
        const newCat = {
          name: this.inputName.value,
          imgSrc: this.inputUrl.value,
          clickerCounter: this.inputClicks.value,
        };
        controller.saveCat(newCat);
      });
      this.render();
    },
    render() {
      const updateInfo = () => {
        const currentCat = controller.getActiveCat();
        this.inputName.value = currentCat.name;
        this.inputUrl.value = currentCat.imgSrc;
        this.inputClicks.value = currentCat.clickerCounter;
      };
      updateInfo();
    },
  };

  controller.init();
})();
