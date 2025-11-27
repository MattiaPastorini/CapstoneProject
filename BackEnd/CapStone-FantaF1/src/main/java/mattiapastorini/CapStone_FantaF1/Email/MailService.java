package mattiapastorini.CapStone_FantaF1.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${TUO_INDIRIZZO_EMAIL}")
    private String mailFrom;

    public void sendRegistrationEmail(String toEmail, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Benvenuto su FantaF1, " + username + "!");
        message.setText("Ciao " + username + ",\n\nLa tua registrazione al FantaF1 è avvenuta con successo!");
        message.setFrom(mailFrom);

        mailSender.send(message);
    }
}

