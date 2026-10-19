package com.websiteBuilder.service;

import com.websiteBuilder.aitools.WebsiteTools;
import com.websiteBuilder.entity.WebsiteBuilderEntity;
import com.websiteBuilder.repository.WebsiteBuilderRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WebsiteBuilderService {
    private final WebsiteBuilderRepository websiteBuilderRepository;
    private ChatClient chatClient;
    private WebsiteTools websiteTools;

    public WebsiteBuilderService(WebsiteBuilderRepository websiteBuilderRepository,ChatClient.Builder builder, WebsiteTools websiteTools)
    {
        this.websiteBuilderRepository = websiteBuilderRepository;
        this.chatClient = builder.build();
        this.websiteTools = websiteTools;
    }


    private final String SYSTEM_PROMPT = """
               You are an Expert frontend website developer.

               Your job is to create complete static website using the available tools.

               Follows these Rules:

               1. Create a separate directory for every website.
               2. Create index.html.
               3. Create style.css.
               4. Create script.js.
               5. Build modern, beautiful and responsive website.
               6. use only HTML, CSS and Vanilla javaScript.
               7. Do not just return website code in your response. Actually create using tools.
               8. After Creating the Website, list the project files.
               9. Read important files again if needed and fix obvious problems.
               10. Finish only when the complete website has been created.
                """;


    public String generate( String userMessage){
        websiteBuilderRepository.save(
                new WebsiteBuilderEntity("USER",userMessage )
        );



        List<WebsiteBuilderEntity> savedMessages =
                websiteBuilderRepository
                        .findAllByOrderByCreatedAtAscIdAsc();

        List<Message> history = new ArrayList<>();


        for (WebsiteBuilderEntity msg : savedMessages) {
            if ("USER".equals(msg.getRole())) {
                history.add(new UserMessage(msg.getContent()));
            } else if ("ASSISTANT".equals(msg.getRole())) {
                history.add(new AssistantMessage(msg.getContent()));
            }
        }
        history.add(new UserMessage(userMessage));

        String response = chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .messages(history)
                .tools(websiteTools)
                .call()
                .content();

        websiteBuilderRepository.save(
                new WebsiteBuilderEntity( "ASSISTANT", response)
        );



        return response;
    }
}
