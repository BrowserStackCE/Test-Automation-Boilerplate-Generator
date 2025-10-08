import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ExampleTest {
  public static void main(String[] args) {
    WebDriver driver = new ChromeDriver();
    driver.get("https://www.selenium.dev");
    System.out.println(driver.getTitle());
    driver.quit();
  }
}