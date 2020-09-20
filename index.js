var cv = document.getElementById("canvas")
			var c = cv.getContext("2d")

			var population = 100
			var infected = document.getElementById("si").value
			var speed = 10
			var currentInfections = 1

			cv.width = window.innerWidth
			cv.height = window.innerHeight

			var dots = [];

			// [x, y, state, vx, vy, time]
			for(var i = 0; i<population-infected;i++){
				dots.push([Math.random()*Math.min(cv.width,cv.height)*3/4,Math.random()*Math.min(cv.width, cv.height) * 3/4,0,speed*Math.random(),speed*Math.random()])
			}
			for(var i = 0; i<infected; i++){
				dots.push([Math.random()*Math.min(cv.width, cv.height) * 3/4,Math.random()*Math.min(cv.width, cv.height) * 3/4,1,speed*Math.random(),speed*Math.random(),0])
			}
			var refresh = function()
			{

				c.fillStyle = "rgb(255,255,255)"
				c.fillRect(0,0,window.innerWidth,window.innerHeight)
				c.strokeStyle = "rgb(0,0,0)"
				c.strokeRect(cv.width/2 - Math.min(cv.width, cv.height) * 3/8, cv.height/2 - Math.min(cv.width, cv.height) * 3/8, Math.min(cv.width, cv.height) * 3/4, Math.min(cv.width, cv.height) * 3/4)
				for(var i = 0; i<population;i++){	//drawing
					if(dots[i][2] == 0){
						c.fillStyle = "rgb(0,0,255)"
						fillEllipse(dots[i][0]+cv.width/2 - Math.min(cv.width, cv.height) * 3/8,dots[i][1]+cv.height/2 - Math.min(cv.width, cv.height) * 3/8,5,c)
					} else if(dots[i][2] == 1) {
						c.fillStyle = "rgb(255,0,0)"
						fillEllipse(dots[i][0]+cv.width/2 - Math.min(cv.width, cv.height) * 3/8,dots[i][1]+cv.height/2 - Math.min(cv.width, cv.height) * 3/8,5,c)
					} else if(dots[i][2] == 3) {
						c.fillStyle = "rgb(0,0,0)"
						fillEllipse(dots[i][0]+cv.width/2 - Math.min(cv.width, cv.height) * 3/8,dots[i][1]+cv.height/2 - Math.min(cv.width, cv.height) * 3/8,5,c)
					}
					else {
						c.fillStyle = "rgb(139,272,2)"
						fillEllipse(dots[i][0]+cv.width/2 - Math.min(cv.width, cv.height) * 3/8,dots[i][1]+cv.height/2 - Math.min(cv.width, cv.height) * 3/8,5,c)
					}
				}
				for(var i = 0; i < population;i++){	//movement
					dots[i][3]+=Math.random()*2-1
					dots[i][4]+=Math.random()*2-1

					if ( dots[i][3] >= speed ){dots[i][3] = 0}
					if ( dots[i][3] <= -speed ){dots[i][3] = 0}
					if ( dots[i][4] >= speed ){dots[i][4] = 0}
					if ( dots[i][4] <= -speed ){dots[i][4] = 0}

					dots[i][0]+=dots[i][3]
					dots[i][1]+=dots[i][4]

					if(dots[i][0]>1*Math.min(cv.width,cv.height)*3/4){
						dots[i][0]=1*Math.min(cv.width,cv.height)*3/4	
					}
					if(dots[i][0]<0){
						dots[i][0]=0	
					}
					if(dots[i][1]>1*Math.min(cv.width,cv.height)*3/4){
						dots[i][1]=1*Math.min(cv.width,cv.height)*3/4	
					}
					if(dots[i][1]<0){
						dots[i][1]=0	
					}
				}
				for(var i = 0;i<population;i++){	//infection
					if(dots[i][2] == 1){
						dots[i][5]++
						for(var j = 0;j<population;j++){
							for(var k = 0;k<10;k++){
								if(Math.round(dots[i][1])+k == Math.round(dots[j][1]) && Math.round(dots[i][0]) == Math.round(dots[j][0]) && dots[j][2] == 0){
									dots[j][2] = 1
									dots[j].push(0)
									currentInfections++
								}
								if(Math.round(dots[i][1])-k == Math.round(dots[j][1]) && Math.round(dots[i][0]) == Math.round(dots[j][0]) && dots[j][2] == 0) {
									dots[j][2] = 1
									dots[j].push(0)
									currentInfections++
								}
								if(Math.round(dots[i][1]) == Math.round(dots[j][1]) && Math.round(dots[i][0])+k == Math.round(dots[j][0]) && dots[j][2] == 0) {
									dots[j][2] = 1
									dots[j].push(0)
									currentInfections++
								}
								if(Math.round(dots[i][1]) == Math.round(dots[j][1]) && Math.round(dots[i][0])-k == Math.round(dots[j][0]) && dots[j][2] == 0) {
									dots[j][2] = 1
									dots[j].push(0)
									currentInfections++
								}
							}
						}
						if(dots[i][5] >= 200) {
							var die = Math.round(Math.random())
							if(die == 0) {
								dots[i][2] = 2
							} else {
								dots[i][2] = 3
							}
						}
					}
				}
				window.requestAnimationFrame(refresh)

			}

			refresh()
