package main;

public class CallByReference {
    @SuppressWarnings("removal")
	public static void main(String[] args){
        Integer a,b,c;
        a = new Integer(100);
        //a = 100; // Using auto-boxing
        b = new Integer(200);
        c=findSum(a,b);
        System.out.println("Sum: "+c.intValue());
    }

    @SuppressWarnings("removal")
	private static Integer findSum(Integer x, Integer y) {
        Integer s = new Integer(x.intValue()+y.intValue());
        //s=x+y;      //using auto unboxing
        return s;
    }

}
