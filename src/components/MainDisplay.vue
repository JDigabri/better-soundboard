<template>
  <div style="margin-bottom: 25px;width: 100vw; ">
    <div class="slider">
      <div
        class="home"
        :style="{
          backgroundImage: `url(https://assetsio.gnwcdn.com/hades-artwork.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp)`,
        }"
        style="
          filter: blur(50.5px) brightness(100%);
          position: absolute;
          z-index: 0;
        "
      ></div>

      <div
        class="home"
        :style="{
          backgroundImage: `url(https://cdn1.epicgames.com/min/offer/2560x1440-2560x1440-5e710b93049cbd2125cf0261dcfbf943.jpg)`,
        }"
        style="position: relative; z-index: 1"
      ></div>
      <div class="stacked">
        <div class="outer" style="position: absolute">
          <div
            class="Purchase"
            :style="{
              backgroundImage: `url(https://assetsio.gnwcdn.com/hades-artwork.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp)`,
            }"
            style="
              background: rgba(52, 58, 68, 0);
              position: absolute;
              top: 0px;
              z-index: 1;
            "
          >
            <div
              class="textArea"
              style="position: relative; z-index: 1; height: 100%"
            >
              <p class="song-title">
              Hades Sound Board
              </p>
              
              <div class="songList">
                <div
                  v-for="n in 5"
                  :key="n"
                  :style="{
                    borderBottom: n !== 5 ? '1px solid #00000010' : 'none',

                  }"
                  class="sounds"
                >
                  <p style="margin-left: 20px" class="song-duration">
                    <div class="song-number-wrapper">

                    <span class="song-number">{{`${n}. `}}</span>
                    <span class="play-icon">
                        <svg id="fi_727245" fill="white" enable-background="new 0 0 320.001 320.001" viewBox="0 0 320.001 320.001" xmlns="http://www.w3.org/2000/svg"><path d="m295.84 146.049-256-144c-4.96-2.784-11.008-2.72-15.904.128-4.928 2.88-7.936 8.128-7.936 13.824v288c0 5.696 3.008 10.944 7.936 13.824 2.496 1.44 5.28 2.176 8.064 2.176 2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z"></path><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                    </span>
                    </div>

                        <span style="margin-left: 10px">Johnny is Bad at Rust</span>
                  </p>
                  <p style="margin-left: 20px">Ephis</p>
                  <p style="margin-right: 20px">
                    <span class="number">{{`${n}:0${n}`}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="Purchase"
            :style="{
              backgroundImage: `url(https://assetsio.gnwcdn.com/hades-artwork.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp)`,
            }"
            style="
              filter: blur(25.5px) brightness(90%);
              clip-path: inset(0 0 0 0 round 25px);
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.images {
  position: relative;
  margin-top: 275px;
  display: flex;
  margin-left: 15px;
  flex-direction: row;
  border-radius: 25px;
  gap: 10px;
}
.image {
  border-radius: 15px;
}
.home {
  margin-top: 25px;
  background-color: #4e596d10;
  background-position: 0px;
  display: flex;
  flex-direction: column;
  background-size: 150% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 285px !important;
  height: 270px !important;
  border-radius: 25px;
  transition: transform 0.2s;
  transition: width 0.2s ease-in-out; /* Transition the width property */
  transition: all 0.2s ease-in-out;
}

.home:hover {
  background-size: 155% 105% !important;
  transition: all 0.2s ease-in;
}
.songList {
  background: rgba(112, 125, 148, 0.3);
  width: 100%;
  height: 308.333px;
  border-radius: 25px;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  font-weight: 100;
  display: flex;
  flex-direction: column;
  padding-right: 0px;
}
.sounds{
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 17px;
    font-family: "Inter", sans-serif;
    font-weight: 100;
    overflow-y: hidden;
}
.song-duration{
    display: flex;
    align-items: center;
}
.song-title{
    font-size: 18px;
    margin-left: 15px;
    font-weight: 300;
    margin-block-end: 0px;
    overflow-y: hidden;
    margin-bottom: 10px;
    height: 30px;
}
@media (min-width: 1500px) {
  .home {
    width: 340px !important;
    height: 325px !important;
    transition: all 0.2s ease-in-out;
  }

  .home:hover {
    transition: all 0.2s ease-in;
  }
  .Purchase {
    height: 325px !important;
    width: 745px !important;
  }
  .slider {
    margin-right: 540px !important;
  }
  .sounds{
    font-size: 19px;
    font-weight: 200;
}
.song-title{
    font-size: 21px;

}
#fi_727245{
  height: 16px;
  width: 16px;
}
}

@media (min-width: 1700px) {
    .sounds{
    font-size: 22px;
    font-weight: 200;
}
  .home {
    width: 370px !important;
    height: 370px !important;
    transition: height 0.2s ease-in-out; /* Transition the width property */
    background-size: 150% 100% !important;
    transition: all 0.2s ease-in-out;
  }
  .home:hover {
    background-size: 155% 105% !important;
    cursor: pointer;
    transition: all 0.2s ease-in;
  }
  .Purchase {
    height: 370px !important;
    width: 990px !important;
  }
  #imagecontainer {
    max-height: 120px !important;
    max-width: 122px !important;
  }
  .images {
    margin-top: 325px !important;
  }
  .textArea {
    height: 100% !important;
    font-size: 10px !important;
  }
  .prices {
    margin-top: 75px !important;
  }
  .slider {
    margin-right: 797.5px !important;
    
}

.song-title{
    font-size: 24px;
    margin-left: 15px;
    margin-top: 20px;
    font-weight: 300;
    margin-block-end: 0px;
}

#fi_727245{
  height: 16px !important;
  width: 16px !important;
}
}
.slider {
  display: flex; 
  justify-content: center;
  margin-right: 450px;

}
.Purchase {
  margin-top: 25px;
  border-radius: 10px;
  margin-left: 15px;
  height: 270px;
  width: 600px;
  transition: all 0.2s ease-in;

}
.textArea {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  color: white;
  font-family: "Inter", sans-serif;
}

a {
  text-decoration: none;
  color: white;
  font-size: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 200;
}
.home > .textArea > span {
  margin-left: 25px;
  color: white;
  font-size: 11px;
  font-family: "Inter", sans-serif;
  width: 300px;
}

#imgs {
  width: 250%;
  height: 200%;
}

#imagecontainer {
  max-height: 100px;
  max-width: 110px;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tagCont {
  display: flex;
  margin-left: 15px;
  font-family: "Inter", sans-serif;
  font-weight: 200;
  font-size: 15px;
}

.tag {
  padding: 7px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-right: 5px;
  border-radius: 25px;
}

.sounds .play-icon {
    display: none;

}
.sounds svg{
    margin: 0px;
}
.sounds:hover .play-icon {
    display: inline-block;
}
.sounds:hover .song-icon {
  display: inline-block;

}
.sounds:hover .song-number {
  display: none;
}
.sounds:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.song-number-wrapper {
  display: inline-block;
  width: 20px;
}
.song-title .song-icon {
  display: none;
  vertical-align: middle;
}
.song-title:hover .song-icon {
  display: inline-block;
}
.song-title:hover .song-number {
  display: none;
}

#fi_727245{
  height: 12px;
  width: 12px;
}
</style>
