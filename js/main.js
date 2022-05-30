'use strict'

class ConstructionCalculator {
   constructor({ wrapper, images, typeBuilding, dataBody, areaRoom, result }) {
      this.wrapper = document.querySelector(wrapper);
      this.images = this.wrapper.querySelector(images);
      this.typeBuilding = this.wrapper.querySelectorAll(typeBuilding);
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
            let copy = target.closest('.options').cloneNode(true);
            copy.querySelector('.name__building').value = '';
            copy.querySelector('.square').value = '';
            target.closest('.data__body').append(copy);
            this.hideButton(target.closest('.third_button'));
            if (this.dataBody.length > 1) {
               this.showButton(target.closest('.options'));
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
               target.closest('.options').remove();
            }
            this.calcAreaRooms();
            this.calcPrice();
         }
      });
   }

   hideButton(elem) {
      elem.classList.add('hide');
   }

   showButton(elem) {
      elem.querySelector('.fourth_button').classList.remove('hide');
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