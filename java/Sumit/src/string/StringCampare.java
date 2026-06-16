package string;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Result {

    /*
     * Complete the 'matchingStrings' function below.
     *
     * The function is expected to return an INTEGER_ARRAY.
     * The function accepts following parameters:
     *  1. STRING_ARRAY strings
     *  2. STRING_ARRAY queries
     */

    public static List<Integer> matchingStrings(List<String> strings, List<String> queries) {
    ArrayList<Integer> arr = new ArrayList<>();
    for (String element : queries) {
        int count=0;
        for (String string : strings) {
            if(element.equals(string)){
                count++;
            }
        }
        arr.add(count);
    }

    return arr;

    }

}

public class StringCampare {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no. of string and Strings:-");
    	int stringsCount = sc.nextInt();
        List<String> strings = new ArrayList<>();
        for (int i = 0; i < stringsCount; i++) {
            String stringsItem = sc.next();
            strings.add(stringsItem);
        }
        System.out.println("Enter no. of queries and queries:-");
        int queriesCount = Integer.parseInt(sc.next());

        List<String> queries = new ArrayList<>();
        List<Integer> arrLi = new ArrayList<>();

        for (int i = 0; i < queriesCount; i++) {
            String queriesItem = sc.next();
            queries.add(queriesItem);
        }

        List<Integer> res = Result.matchingStrings(strings, queries);

        for (Integer re : res) {
            System.out.println(re);
        }
        sc.close();
    }
}

