package main;



public class BinaryToDec {

        
    public static void main(String []args) {
    
	    int n=1101;
	    int count = 0;
	    double sum = 0;
	    while(n>0) {
	    	int rem = n%10;
	    	double pow = 1;
	    	pow = Math.pow(2, count);
//	    	if(rem == 0) {
//	    		pow=0;
//	    	}
//	    	else if(rem == 1 && count ==0) {
//    			pow = 1;
//    		}
//    		else if(rem == 1){
//	    		for(int i=0; i<count; i++) {
//	    			pow = pow * 2;
//	    		}
//	    	}
	    	sum = sum + rem * pow;
	    	count++;
	    	n = n/10;
	    }
    	System.out.println(sum);
    }
}

 