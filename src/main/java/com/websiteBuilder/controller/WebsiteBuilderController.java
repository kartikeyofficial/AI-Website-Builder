package com.websiteBuilder.controller;


import com.websiteBuilder.service.WebsiteBuilderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@RestController
@RequestMapping("/website")
public class WebsiteBuilderController {

    private final WebsiteBuilderService websiteBuilderService;

    public WebsiteBuilderController(WebsiteBuilderService websiteBuilderService) {
        this.websiteBuilderService = websiteBuilderService;
    }

    @PostMapping()
    public Flux<String> chat(@RequestBody String message){
        return websiteBuilderService.generate(message);
    }
}
