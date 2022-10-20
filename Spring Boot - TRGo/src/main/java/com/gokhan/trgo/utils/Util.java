package com.gokhan.trgo.utils;

import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class Util {
    public static String capitalizedWords(String sentence) {
        String[] words = sentence.split(" ");
        StringBuilder sbCapitalizedWords = new StringBuilder(sentence.length());

        for (String word : words) {

            if (word.length() > 1)
                sbCapitalizedWords
                        .append(word.substring(0, 1).toUpperCase(Locale.ROOT))
                        .append(word.substring(1).toLowerCase(Locale.ROOT));
            else
                sbCapitalizedWords.append(word.toUpperCase());

            sbCapitalizedWords.append(" ");
        }
        return sbCapitalizedWords.toString().trim();
    }

    public static long getDifferenceDays(Date d1, Date d2) {
        long diff = d2.getTime() - d1.getTime();
        return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
    }
}
