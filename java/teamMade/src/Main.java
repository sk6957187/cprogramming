import java.util.Scanner;

public class Main {
    public static void main(String[] args)
    {
        int m,n,team;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of freshers:");
        m = sc.nextInt();
        System.out.println("Enter the number of experienced:");
        n = sc.nextInt();
        team=0;
        while (m>=1 && n>=1 && m+n>=4){
            team++;
            m--;
            n--;
        }
        System.out.println("Number of team formed:"+team);
    }
}