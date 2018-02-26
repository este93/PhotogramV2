<template>
    <div class="p-profile-edit wrapper" id="dashboard-wrapper">
	    <app-header></app-header>
	    <div class="b-notifications wrapper-inner">
			<div class="b-notifications__tabs">
				<button @click="tab = 1" :class="{active: tab === 1}" class="b-notifications__tabs__button">MY NOTIFICATION</button>
				<button @click="tab = 2" :class="{active: tab === 2}" class="b-notifications__tabs__button">MY FOLLOWERS</button>
			</div>
			<div class="b-notifications__main">
				<div class="b-notifications__single">					
					<div class="b-notifications__single--left">
						<div class="b-notifications__single__img small"></div>
						<p class="b-notifications__single__txt"><span>user_name</span> started following you <br><span>full_name</span></p>
					</div>
					<div class="b-notifications__single--right">
						<button class="b-notifications__single__button btn btn--small">Follow</button>
					</div>
				</div>
				<div class="b-notifications__single">					
					<div class="b-notifications__single--left">
						<div class="b-notifications__single__img"></div>
						<p class="b-notifications__single__txt"><span>user_name</span>  started following you <br><span>full_name</span></p>
					</div>
					<div class="b-notifications__single--right">
						<button class="b-notifications__single__button btn btn--small">Follow</button>
					</div>
				</div>
				<div class="b-notifications__single">					
					<div class="b-notifications__single--left">
						<div class="b-notifications__single__img"></div>
						<p class="b-notifications__single__txt"><span>user_name</span>  started following you <br><span>full_name</span></p>
					</div>
					<div class="b-notifications__single--right">
						<button class="b-notifications__single__button btn btn--small">Follow</button>
					</div>
				</div>
				<div class="b-notifications__single">					
					<div class="b-notifications__single--left">
						<div class="b-notifications__single__img"></div>
						<p class="b-notifications__single__txt"><span>user_name</span>  started following you <br><span>full_name</span></p>
					</div>
					<div class="b-notifications__single--right">
						<button class="b-notifications__single__button btn btn--small">Follow</button>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tab: 1,
			}	
		},
		created(){ 	
			this.$store.dispatch('updateTitle', 'Search');
            this.$store.commit('resetIcons');
            this.$store.commit('setSearchIcon');
		}
	}
</script>