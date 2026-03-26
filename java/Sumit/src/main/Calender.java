package main;

class Calender {
    public static void main(String[] args) {
        int dd = 15;
        int mm = 8;
        int yy = 1947;
        int lp = 0;
        boolean year = false;

        if (yy % 400 == 0 || (yy % 4 == 0 && yy % 100 != 0)) {
            year = true;
            lp = 1;
        }

        // Calculate days in the current year up to given date
        int day = dd;
        for (int i = 1; i < mm; i++) {
            if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                day += 31;
            } else if (i == 4 || i == 6 || i == 9 || i == 11) {
                day += 30;
            } else if (i == 2) {
                day += (lp > 0) ? 29 : 28;
            }
        }

        // Calculate total days from year 1 to last completed year (yy-1)
        int dayY = (yy - 1) * 365;
        int leapDay = (yy - 1) / 4 - (yy - 1) / 100 + (yy - 1) / 400;

        // Total days since year 1 to the given date
        int totDay = day + dayY + leapDay;

        // Compute day of the week (01/01/0001 was a Monday)
        int n = totDay % 7;

        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

        System.out.println("Day: " + days[n]);
        System.out.println("Leap Year: " + year);
    }
}
