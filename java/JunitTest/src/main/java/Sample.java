public class Sample {
    public static int add(int a, int b){
        return a+b;
    }

    public static boolean vote(int a) {
        if(a>=18)
            return true;
        else
            return false;
    }

    public static boolean loop(int a) {
        for(int i=0; i<=100; i++){
            if (i==99)
                return true;
        }
        return false;
    }
}
