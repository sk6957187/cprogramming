import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.*;


import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

class SampleTest {
    int i=0;
    @Test
    public void twoPlusTwoEqualFour(){
        var cal = new Sample();
        i=1;
        assertEquals(4, 2, 2);
    }

    @Test
    public void twoPlusThree(){
        var cal = new Sample();
        assertEquals(5, 3, 2);
        i=2;
    }

    @Test
    @DisplayName("Here show only inside display content.")
    public void gender() {
        var cal = new Sample();
        assertTrue(Sample.vote(18));
        i=3;
    }

    @Test
    public void loop(){
        var cal = new Sample();
        assertTrue(Sample.loop(100));
        i=4;
    }


    @BeforeAll
    public static void setUpBeforeClass() throws Exception {
        System.out.println("Testing start...");
    }
    @BeforeEach
    public void setUp() throws Exception {
        System.out.println("before");
    }

    @AfterEach
    public void tearDown() throws Exception {
        if(i==0){
            System.out.println("test case fale.");
        }
        else {
            System.out.println(i+"st test case done.");
        }
    }

    @AfterAll
    public static void tearDownAfterClass() throws Exception {
        System.out.println("All test case done.");
    }
}
