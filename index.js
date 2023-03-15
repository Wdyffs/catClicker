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
  };
  const view = {
    init: function () {
      catsButtonListView.init();
      catCardView.init();
      this.render();
    },
    render: function () {
      catCardView.render();
    },
  };
  const catsButtonListView = {
    init: function () {
      const buttonsBlock = document.createElement("div");
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
      const app = document.getElementById("app");
      app.append(buttonsBlock);
    },
    render: function () {},
  };
  const catCardView = {
    init: function () {
      const catArea = document.createElement("div");
      catArea.classList.add("catArea");
      const catCardBlock = document.createElement("div");
      catCardBlock.classList.add("catCard");
      this.catImage = document.createElement("img");
      this.catNameParagraph = document.createElement("p");
      this.catClickCounter = document.createElement("span");
      this.catClickCounter.classList.add("counter");
      this.catImage.addEventListener("click", () => {
        const cat = controller.getActiveCat();
        controller.updateCatClickerCount(cat.name);
        this.catClickCounter.textContent =
          controller.getActiveCat().clickerCounter;
      });
      catCardBlock.append(this.catImage);
      catCardBlock.append(this.catNameParagraph);
      catCardBlock.append(this.catClickCounter);
      catArea.append(catCardBlock);
      const app = document.getElementById("app");
      app.append(catArea);
    },
    render: function () {
      const cat = controller.getActiveCat();

      this.catImage.src = cat.imgSrc;
      this.catNameParagraph.textContent = cat.name;
      this.catClickCounter.textContent = cat.clickerCounter;
    },
  };

  controller.init();
})();
