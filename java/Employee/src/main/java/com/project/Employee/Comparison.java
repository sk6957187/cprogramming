package com.project.Employee;

import com.project.mysqlTables.Employee;

public class Comparison implements Idsort, SalarySort, NameSort {
    @Override
    public void SortbyID(Groups g) {
        Employee temp;
        Employee[] arr = g.employees;
        for (int i = 0; i < g.getCounter() - 1; i++) {
            for (int j = 0; j < g.getCounter() - 1 - i; j++) {
                if (arr[j].getEmployeeId() > arr[j + 1].getEmployeeId()) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }


    }

    @Override
    public void sortByName(Groups g) {

        Employee temp;
        Employee[] arr = g.employees;
        for (int i = 0; i < g.getCounter() - 1; i++) {
            for (int j = i+1; j < g.getCounter() - 1; j++) {
                if (arr[i].getEmployeeName().compareTo(arr[j].getEmployeeName()) > 0) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

    }

    @Override
    public void SortbySalary(Groups g) {
        Employee temp;
        Employee[] arr = g.employees;
        for (int i = 0; i < g.getCounter() - 1; i++) {
            for (int j = 0; j < g.getCounter() - 1 - i; j++) {
                if (arr[j].getSalary() > arr[j + 1].getSalary()) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
