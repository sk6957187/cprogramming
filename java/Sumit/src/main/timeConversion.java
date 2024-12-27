package main;

import java.util.Scanner;

public class timeConversion {

    /*
     * Complete the 'timeConversion' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING s as parameter.
     */

    public static void main(String[] args) {
        
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter time in AM/PM formet: ");
        //String s = sc.nextLine();
        String s="10:11:11AM";
        String result = timeCon(s);

        System.out.println(result);
        sc.close();
    }
    
    public static String timeCon(String s) {
    	
	    String h = s.substring(0, 3);
	    System.out.println(h);
	    int intHr= Integer.parseInt(s.substring(0, 2));
	    String strHr="";
	    if(s.indexOf("PM") != -1){
	        if(intHr<12){
	            strHr = (intHr+12) + "";
	        }
	        else{
	            strHr=h;
	        }
	    }
	    else{
	        if(intHr<12){
	            strHr=h;
	        }else{
	            strHr="00";
	        }
	    }
	    String res = strHr + s.substring(2, s.length()-2);
	    return res;
	
	    }
}
