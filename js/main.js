'use strict'

class ConstructionCalculator {
   constructor({ wrapper, images, typeBuilding, rooms, allRooms, dataBody, areaRoom, result }) {
      this.wrapper = document.querySelector(wrapper);
      this.images = this.wrapper.querySelector(images);
      this.typeBuilding = this.wrapper.querySelectorAll(typeBuilding);
      this.rooms = this.wrapper.querySelector(rooms);
      this.allRooms = this.wrapper.querySelectorAll(allRooms);
      this.dataBody = this.wrapper.getElementsByClassName(dataBody);
      this.areaRoom = this.wrapper.getElementsByClassName(areaRoom);
      this.result = this.wrapper.querySelector(result);
   }

   changPictures() {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('select')) {
            this.images.setAttribute('src', target.selectedOptions[0].dataset.pic)
         }
         this.calcPrice();
      });
   }

   addRooms() {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('.add_button')) {
            let copy = target.parentElement.parentElement.cloneNode(true);
            for (let i = 0; i < 2; i++) {
               copy.children[i].lastElementChild.value = ''
            }
            target.parentElement.parentElement.parentElement.append(copy);
            this.hideButton(target.parentElement);

            if (this.dataBody.length > 1) {
               this.showButton(target.parentElement);
            }
            this.calcAreaRooms();
            this.calcPrice();
         }
      });
   }

   removingRooms() {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('.hide_button')) {
            if (this.dataBody.length > 1) {
               target.parentElement.parentElement.remove();
            }
            this.calcAreaRooms();
            this.calcPrice();
         }
      });
   }

   hideButton(elem) {
      elem.parentElement.children[2].classList.add('hide');
   }

   showButton(elem) {
      elem.parentElement.lastElementChild.classList.remove('hide');
   }

   calcAreaRooms() {
      let sum = 0;
      for (let i of this.areaRoom) {
         sum += +i.value;
      }
      return sum;
   }

   calcPrice() {
      let result = this.calcAreaRooms() * this.typeBuilding[0].value;
      this.result.innerText = result.toFixed(2);
   }

   calcPriceOnButton() {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('.footer_button')) {
            this.calcPrice();
         }
      });
   }


   init() {
      // console.dir(this);
      this.changPictures();
      this.addRooms();
      this.removingRooms();
      this.calcPriceOnButton()
      this.calcAreaRooms();
      this.calcPrice();
   }
}