
import java.util.Scanner;
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

public class velocitytemp {
    public String generateTemplate() throws Exception {

        VelocityEngine velocityEngine = new VelocityEngine();
        velocityEngine.init();
        Template template = velocityEngine.getTemplate("src/main/resources/prog.html");

        VelocityContext context = new VelocityContext();
        context.put("Subscription Name", "John");
        context.put("Expiry Date","10-May-2024");
        context.put("Remarks","We will not be able to extract candidate information after expiration of this subscription\n" +
            "\n" +
            "Please do the needful to avoid the impact of the same.");
        StringWriter writer = new StringWriter();
        template.merge(context, writer);
        System.out.println(writer.toString());

        return writer.toString();
    }
}


