import CodeBlock from "@/components/docs/CodeBlock";
import ConfigExample from "@/components/docs/ConfigExample";

const Introduction = () => {
  return (
    <article className="prose prose-invert max-w-none scroll-smooth">
      <section id="introduction" className="scroll-mt-20">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Introduction</h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Serenity is a next-generation static analysis tool for Go that prioritizes 
          precision, speed, and developer experience above all else.
        </p>
      </section>

      <section id="usage" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mt-12 mb-4">Usage</h2>
        
        <p className="text-muted-foreground mb-4">
          To run Serenity on your project, use the <code className="text-accent bg-muted px-1.5 py-0.5 rounded">check</code> command. 
          The default path is the current directory (<code className="text-accent bg-muted px-1.5 py-0.5 rounded">.</code>).
        </p>

        <CodeBlock code="serenity check ." language="bash" />

        <p className="text-muted-foreground mb-4">
          You can also specify a specific path:
        </p>

        <CodeBlock code="serenity check ./cmd/..." language="bash" />
      </section>

      <section id="configuration" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mt-12 mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Serenity is highly configurable. You can define your rules in a configuration file.
          Below is a real-world example of how to configure the linter rules in different formats.
        </p>
        
        <ConfigExample />
      </section>

      <section id="rules" className="scroll-mt-20">
        <hr className="border-white/10 my-12" />

        <h2 className="text-3xl font-bold mb-8">Rule Groups</h2>

        <div className="space-y-16">
          {/* Error Handling */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Error Handling</h3>
            <p className="text-muted-foreground mb-6">
              Rules related to proper error handling and reporting.
            </p>
            
            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-error-shadowing</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid shadowing the built-in <code>error</code> type or variables named <code>error</code>.
                </p>
                <CodeBlock 
                  code={`// Bad
func main() {
    error := doSomething() // Shadows built-in error type if named 'error' incorrectly in scopes
    // ...
}

// Good
func main() {
    err := doSomething()
    if err != nil {
        // ...
    }
}`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">error-string-format</h4>
                <p className="text-muted-foreground mb-4">
                  Error strings should not be capitalized (unless beginning with proper nouns or acronyms) or end with punctuation.
                </p>
                <CodeBlock 
                  code={`// Bad
errors.New("Something went wrong.")

// Good
errors.New("something went wrong")`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">error-not-wrapped</h4>
                <p className="text-muted-foreground mb-4">
                  Errors returned from external packages should be wrapped to provide context.
                </p>
                <CodeBlock 
                  code={`// Bad
func GetData() error {
    if err := db.Query(); err != nil {
        return err
    }
    return nil
}

// Good
func GetData() error {
    if err := db.Query(); err != nil {
        return fmt.Errorf("failed to query data: %w", err)
    }
    return nil
}`} 
                  language="go" 
                />
              </div>
            </div>
          </section>

          {/* Imports */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Imports</h3>
            <p className="text-muted-foreground mb-6">
              Rules to ensure clean and safe package imports.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-dot-imports</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid dot imports to prevent namespace pollution and ambiguity.
                </p>
                <CodeBlock 
                  code={`// Bad
import . "fmt"

// Good
import "fmt"`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">disallowed-packages</h4>
                <p className="text-muted-foreground mb-4">
                  Prevent usage of specific packages (e.g., <code>reflect</code>, <code>unsafe</code>) as configured.
                </p>
                <CodeBlock 
                  code={`// If "reflect" is in disallowedPackages:

// Bad
import "reflect"

// Good
// Use type assertions or other safe methods instead`} 
                  language="go" 
                />
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Best Practices</h3>
            <p className="text-muted-foreground mb-6">
              Idiomatic Go patterns and code quality improvements.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-defer-in-loop</h4>
                <p className="text-muted-foreground mb-4">
                  Deferring statements inside a loop can cause memory leaks because they are only executed when the function exits.
                </p>
                <CodeBlock 
                  code={`// Bad
for _, file := range files {
    f, _ := os.Open(file)
    defer f.Close() // Stacks up until function returns
}

// Good
for _, file := range files {
    func() {
        f, _ := os.Open(file)
        defer f.Close()
        // ...
    }()
}`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">context-first-param</h4>
                <p className="text-muted-foreground mb-4">
                  <code>context.Context</code> should always be the first parameter of a function.
                </p>
                <CodeBlock 
                  code={`// Bad
func FetchData(id string, ctx context.Context) error { ... }

// Good
func FetchData(ctx context.Context, id string) error { ... }`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">no-magic-numbers</h4>
                <p className="text-muted-foreground mb-4">
                  Avoid magic numbers; use named constants instead for better readability and maintainability.
                </p>
                <CodeBlock 
                  code={`// Bad
time.Sleep(86400 * time.Second)

// Good
const SecondsInDay = 86400
time.Sleep(SecondsInDay * time.Second)`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">use-slice-capacity</h4>
                <p className="text-muted-foreground mb-4">
                  Specify capacity when allocating slices with <code>make</code> if the length is known, to avoid reallocations.
                </p>
                <CodeBlock 
                  code={`// Bad
data := make([]int, 0)
for i := 0; i < 100; i++ {
    data = append(data, i)
}

// Good
data := make([]int, 0, 100)
for i := 0; i < 100; i++ {
    data = append(data, i)
}`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">always-prefer-const</h4>
                <p className="text-muted-foreground mb-4">
                  Prefer <code>const</code> over <code>var</code> for values that do not change.
                </p>
                <CodeBlock 
                  code={`// Bad
var Pi = 3.14

// Good
const Pi = 3.14`} 
                  language="go" 
                />
              </div>
            </div>
          </section>

          {/* Correctness */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Correctness</h3>
            <p className="text-muted-foreground mb-6">
              Detects potential bugs and incorrect code.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">empty-block</h4>
                <p className="text-muted-foreground mb-4">
                  Detects empty code blocks which might indicate unfinished logic.
                </p>
                <CodeBlock 
                  code={`// Bad
if user.IsActive {
    // missing logic
}

// Good
if user.IsActive {
    processUser(user)
}`} 
                  language="go" 
                />
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">unused-receiver</h4>
                <p className="text-muted-foreground mb-4">
                  Detects method receivers that are not used inside the method body.
                </p>
                <CodeBlock 
                  code={`// Bad
func (u *User) GetStaticID() int {
    return 42
}

// Good
func (u *User) GetStaticID() int {
    _ = u // explicit ignore or remove receiver name
    return 42
}`} 
                  language="go" 
                />
              </div>
            </div>
          </section>

          {/* Complexity */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Complexity</h3>
            <p className="text-muted-foreground mb-6">
              Rules to keep code simple and maintainable.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">max-func-lines</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the number of lines in a function (default: 20).
                </p>
              </div>

              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">max-nesting-depth</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the nesting depth of blocks (e.g. loops inside loops inside ifs).
                </p>
              </div>
              
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">cyclomatic-complexity</h4>
                <p className="text-muted-foreground mb-4">
                  Limits the cyclomatic complexity of functions (number of execution paths).
                </p>
              </div>
            </div>
          </section>

          {/* Naming */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Naming</h3>
            <p className="text-muted-foreground mb-6">
              Enforces naming conventions.
            </p>

            <div className="space-y-8">
              <div className="glow-border rounded-lg p-6 bg-card/30">
                <h4 className="text-xl font-medium text-accent mb-2">receiver-names</h4>
                <p className="text-muted-foreground mb-4">
                  Receiver names should be short and consistent.
                </p>
                <CodeBlock 
                  code={`// Bad
func (service *UserService) Get() { ... }

// Good
func (s *UserService) Get() { ... }`} 
                  language="go" 
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </article>
  );
};

export default Introduction;
