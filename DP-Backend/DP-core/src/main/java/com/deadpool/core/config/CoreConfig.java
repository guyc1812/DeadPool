package com.deadpool.core.config;

import com.mongodb.MongoClient;
import org.eclipse.egit.github.core.client.GitHubClient;
import org.eclipse.egit.github.core.service.*;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;

import java.net.UnknownHostException;

@Configuration
@EnableAspectJAutoProxy
@ComponentScan(basePackages = "com.deadpool")
@PropertySource(value = {
        "classpath:application.properties",
        "classpath:deadPool.properties"})
public class CoreConfig {

    @Bean
    public MongoClient MongoClient(Environment environment) throws UnknownHostException {
        final String mongoUrl = environment.getProperty("mongo.url");
        final String mongoPort = environment.getProperty("mongo.port");
        return new MongoClient(mongoUrl, Integer.parseInt(mongoPort));
    }

    @Bean
    public GitHubClient gitHubClient(Environment environment) {
        final String url = environment.getProperty("github.url");
        final String token = environment.getProperty("github.token");
        GitHubClient gitHubClient = new GitHubClient(url);
        gitHubClient.setOAuth2Token(token);
        return gitHubClient;
    }

    @Bean
    public UserService userService(GitHubClient gitHubClient) {
        return new UserService(gitHubClient);
    }

    @Bean
    public DataService dataService(GitHubClient gitHubClient) {
        return new DataService(gitHubClient);
    }

    @Bean
    public ContentsService contentsService(GitHubClient gitHubClient) {
        return new ContentsService(gitHubClient);
    }

    @Bean
    public CommitService commitService(GitHubClient gitHubClient) {
        return new CommitService(gitHubClient);
    }

    @Bean
    public MarkdownService markdownService(GitHubClient gitHubClient) {
        return new MarkdownService(gitHubClient);
    }
}
