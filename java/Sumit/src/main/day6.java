package main;

public class day6 {
	public static void main(String[] args) {
		Cube();
		AreaParallogram();
		SurfaceAreaSphere();
		SurfaceAreaCone();
		VolumeCone();
		VolumeCylinder();
		rhombus();
		Pentagon();
		Semicircular();
		CirclePer();
		
	}
	
	private static void AreaParallogram() {
		int b=10; int h=20;
		int area = b*h;
		System.out.println("Area of parallogram is: "+ area);
		
	}
	public static void Cube() {
		int a = 10;
		int area = a*a*a;
		System.out.println("Area of cube is: "+area);
	}
	public static void SurfaceAreaSphere() {
		int r=10;
		float area = 4*22.0f*r*r/7.0f;
		System.out.println("Surface Area of Cone is :"+area);
	}
	public static void SurfaceAreaCone() {
		int r =10; int l=20;
		float area = 22.0f/7.0f*r*(r+l);
		System.out.println("Surface Area of Cone is: "+area);
	}
	public static void VolumeCone() {
		int r=10; int h=20;
		float pi = 22.0f/7.0f;
		float vol = (pi*r*r*h)/3.0f;
		System.out.println("Volume of cone is: "+vol);
	}
	public static void VolumeCylinder() {
		int r=10; int h =20;
		float pi= 22.0f/7.0f;
		float vol = pi*r*r*h;
		System.out.println("Volume of cylinder is: "+vol);
	}
	public static void rhombus() {
		int d1=10; int d2=20;
		float area = 1.0f/2.0f*(d1*d2);
		System.out.println("Area of rhombus is: "+area);
	}
	private static void Pentagon() {
		int h=10; int s=20;
		int per = 5*s;
		float area = (h*per)/2.0f;
		System.out.println("Area of pentagon is "+area);
	}
	public static void Semicircular() {
		int r=10; 
		float pi = 22.0f/7.0f;
		float area = pi*r*r/2;
		System.out.println("Area of Semicircular is: "+area);
	}
	public static void CirclePer() {
		int r=10;
		float pi= 22.0f/7.0f;
		float per=2*pi*r;
		System.out.println("Parimeter of circle is: "+per);
	}
	
	
	
}
