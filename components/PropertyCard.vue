<template>
  <div id="property-card" class="mr-2">
      <nuxt-link :to="`/property/details/${property.id}`">
      
    <v-card class="card">
      <div class="card__media-wrapper card__photo">
        <img class="card__map" :src="property.frontViewImage" />
        <div class="icon">
          <svg
            width="23"
            height="18"
            viewBox="0 0 23 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9H22M12 1.5L20.9333 8.2C21.4667 8.6 21.4667 9.4 20.9333 9.8L12 16.5"
              stroke="black"
              stroke-width="3"
            />
          </svg>
        </div>
      </div>

      <div class="card__info">
        <div class="card__info-top">
          <div class="card__info-left">
            <ul class="card__location-list">
              <li class="proprty-title">{{title}}</li>
              <li>{{property.locationName}}</li>
            </ul>
            <div class="card__price-wrapper">
              <div class="card__price"><span>&#8358;</span>{{parseInt(property.price) | currencyFormat}}</div>
              <div class="card__psqft">{{property.categoryName}}</div>
            </div>
          </div>
          <div class="card__info-right">
            <a href="#" class="card__favorite">
              <v-btn fab depressed small>
                <v-icon color="red">mdi-heart</v-icon>
              </v-btn>
              <!-- <svg class="card__heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.3 19.5"><path d="M10.7 19.5c10.7-9 11.4-13.1 10.1-16.2-2-4.6-8.4-4.1-10.2-.5C8.8-.8 2.3-1.3.4 3.3c-1.2 3.2-.5 7.3 10.3 16.2z"/></svg> -->
            </a>
          </div>
        </div>
        <ul class="card__meta">
          <li>
            <strong>{{rooms}}</strong> beds
          </li>
          <li>
            <strong>{{rooms + 1}}</strong> baths
          </li>
          <li>
            <strong>{{perimeterSize | currencyFormat}}</strong> sqft
          </li>
        </ul>
        <div class="card__date">Listed {{20 + rooms}} Days ago</div>
      </div>
    </v-card>
      </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["property"],

  computed:{
      title(){
        return this.property.title.length > 40 ? this.property.title.slice(0, 40) + "..." : this.property.title
      },
      rooms(){
        if(this.property.typeName == "Bungalow") return 4
        else if(this.property.typeName == "2 bedroom flat") return 3
        else if(this.property.typeName == "Serviced Apartment") return 5
      },
      perimeterSize(){
        if(this.property.typeName == "Bungalow") return 3825
        else if(this.property.typeName == "2 bedroom flat") return 1825
        else if(this.property.typeName == "Serviced Apartment") return 5825
      }
  }
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}
small {
  font-size: 80%;
}
strong {
  color: #333;
}

#property-card img {
  max-width: 100%;
  width: 100%;
  height: clamp(100px, 50vh, 200px);
  max-height: 200px;
  box-sizing: border-box;
  border: 0;
  vertical-align: middle;
  border-top-left-radius: 20px;
}

#property-card .icon {
  position: absolute;
  top: 0;
  padding: 25px;
  right: 0;
  border-bottom-left-radius: 20px;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

#property-card .card {
  width: 700px;
  //   margin: 0 auto;
  padding: 10px;
  border: 1px solid #c8c8c8;
  position: relative;
  background: #fff;

  &:hover {
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.5);
    transform: translate(-5px, -5px);
  }

  &:hover .icon svg {
    animation: iconjln 1s;
  }
}

.card__photo {
  position: relative;
  z-index: 2;
  transition: opacity 0.25s linear;
}

.card__info-top {
  margin-top: 30px;
  display: flex;
}
.card__info-left {
  flex-grow: 1;
}
.card__location-list {
  display: flex;
  padding: 0 !important;
  list-style: none;
  font-size: 80%;

  .proprty-title{
      width:180px;
     overflow-wrap: break-word;
      text-overflow: ellipsis;
  }

  > li {
    &:nth-child(2) {
      position: relative;

      &:before {
        content: "|";
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }
}
.card__price-wrapper {
  display: flex;
  align-items: baseline;
}
.card__price {
  //   color: #68cc9f;
  color: #3d6599;
  font-weight: bold;
  font-size: 18px;
  flex-grow: 1;
}
.card__info-right {
  margin-left: 0px;
}
.card__favorite {
  width: 40px;
  height: 40px;
  display: inline-block;
  position: relative;
  border-radius: 50%;
  border: 1px solid fade(#c8c8c8, 90);

  .favorited & {
    background: #aa3939;
    border: none;

    .card__heart {
      color: #fff;
    }
  }
}
.card__heart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  color: #333;
}
.card__meta {
  margin: 10px 0 0 0;
  padding: 0 !important;
  display: flex;
  list-style: none;
  padding-bottom: 5px;
  border-bottom: 2px solid #c8c8c8;

  > li {
    position: relative;
    padding: 0 5px;

    &:nth-child(1) {
      &:before {
        content: "";
        width: 2px;
        height: 4px;
        background: #c8c8c8;
        position: absolute;
        left: 0;
        bottom: -5px;
      }
    }

    &:after {
      content: "";
      width: 2px;
      height: 4px;
      background: #c8c8c8;
      position: absolute;
      right: -1px;
      bottom: -5px;
    }
  }
}
.card__date {
  margin-top: 5px;
  font-size: 80%;
}

@keyframes iconjln {
  0%,
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
  50% {
    opacity: 0;
    transform: translateX(100%);
  }
  70% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>