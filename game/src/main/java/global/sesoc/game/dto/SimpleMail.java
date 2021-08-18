package global.sesoc.game.dto;

public class SimpleMail
{
	private String subject;
	private String from;
	private String to;
	private String content;
	
	public SimpleMail() {
		// TODO Auto-generated constructor stub
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "SimpleMail [subject=" + subject + ", from=" + from + ", to=" + to + ", content=" + content + "]";
	}
}
