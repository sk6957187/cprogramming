Omega = 3*pi;
alpha = pi/3;
T = (2*pi)/Omega;
t = 0:0.01:4*T;
x=3*cos(Omega*t+alpha);
plot(t,x);